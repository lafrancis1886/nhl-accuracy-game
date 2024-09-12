import React from 'react'
import Spinner from './Spinner'
import './SignUpForm.scss'

export default class SignUpForm extends React.Component {
    constructor(props) {
        super(props)

        this.formRef = React.createRef()
        this.firstNameRef = React.createRef()
        this.lastNameRef = React.createRef()
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLoginToggle = this.handleLoginToggle.bind(this)
        this.positionSpinner = this.positionSpinner.bind(this)
        this.handleIconClick = this.handleIconClick.bind(this)
    }

    handleFormChange(event) {
        if(!event.target.closest('.create-user-form')) {
            return 
        }
        this.props.onFormChange(event)
    }

    handleSubmit(event) {
        if(!event.target.closest('.create-user-form')) {
            return
        }
        event.preventDefault()
        this.props.onFormSubmit(event)
    }

    handleLoginToggle(event) {
        this.props.onLoginToggle(event)
    }

    positionSpinner() {
        const parentWidth = parseFloat(this.formRef.current.getBoundingClientRect()?.width)
        if(isNaN(parentWidth)) {
            return "0px"
        }

        const parentMidpoint = (parentWidth / 2.0) - 12.5
        return parentMidpoint+"px"
    }

    handleIconClick(event) {
        const iconInput = event.target.dataset.inputicon
        switch(iconInput) {
            case "first-name-input":
                this.firstNameRef.current.focus()
                break
            case "last-name-input":
                this.lastNameRef.current.focus()
                break
            case "email-input":
                this.emailRef.current.focus()
                break
            case "password-input":
                this.passwordRef.current.focus()
                break;
            default:
                return
        }
    }
    render() {
        return (
            <div className="nhl-form-container create-user-form-container">
                <form ref={this.formRef}onSubmit={this.handleSubmit} className="nhl-form create-user-form">
                    <label className="nhl-form-label first-name-label" htmlFor="first-name-input">First Name</label>
                    <i className="fa-solid fa-signature input-icon" data-inputicon="first-name-input" onClick={this.handleIconClick}></i>
                    <input ref={this.firstNameRef} className="nhl-form-input" id="first-name-input" name="firstName" placeholder="First Name" type="text" pattern="\w{2,16}" value={this.props.formData.firstName} onChange={this.handleFormChange} required />
                    <label className="nhl-form-label last-name-label" htmlFor="last-name-input">Last Name</label>
                    <i className="fa-solid fa-signature input-icon" data-inputicon="last-name-input" onClick={this.handleIconClick}></i>
                    <input ref={this.lastNameRef} className="nhl-form-input" id="last-name-input" name="lastName" placeholder="Last Name" type="text" pattern="\w{2,16}" value={this.props.formData.lastName} onChange={this.handleFormChange} required />
                    <label className="nhl-form-label email-label" htmlFor="email-input">Email</label>
                    <i className="fa-regular fa-envelope input-icon" data-inputicon="email-input" onClick={this.handleIconClick}></i>
                    <input ref={this.emailRef} className="nhl-form-input" id="email-input" name="email" type="email" placeholder="Email" value={this.props.formData.email} onChange={this.handleFormChange} required />
                    <label className="nhl-form-label password-label" htmlFor="password-input">Password</label>
                    <i className="fa-solid fa-lock input-icon" data-inputicon="password-input" onClick={this.handleIconClick}></i>
                    <input ref={this.passwordRef} className="nhl-form-input" id="password-input" name="password" type="password" minLength="10" placeholder="Password" value={this.props.formData.password} onChange={this.handleFormChange} required />
                    {this.props.hasError && <span className="create-user-error">Please ensure all fields are filled out before submitting form.</span>}
                    {this.props.isLoading ? <Spinner left={this.positionSpinner()} />  : <button className="submit-btn" type="submit">Create Account</button>}
                </form>
                <button className="link-to-login" onClick={this.handleLoginToggle}>Already have an account? Login here</button>
            </div>
        )
    }
}