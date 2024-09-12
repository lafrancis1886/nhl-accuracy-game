import React from 'react'
import './LogInForm.scss'
import Spinner from './Spinner'

export default class LogInForm extends React.Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef()
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCreateUserToggle = this.handleCreateUserToggle.bind(this)
        this.setSpinnerPosition = this.setSpinnerPosition.bind(this)
        this.handleIconClick = this.handleIconClick.bind(this)
    }


    handleFormChange(event) {
        if(!event.target.closest('#password-input') && !event.target.closest('#email-input')) {
            return
        }
        this.props.onFormChange(event)
    }

    handleSubmit(event) {
        if(!event.target.closest('.login-form')) {
            return
        }
        event.preventDefault()
        this.props.onFormSubmit(event)
    }

    handleCreateUserToggle(event) {
        this.props.onCreateUserToggle(event)
    }

    setSpinnerPosition() {
        const loginWidth = parseFloat(this.formRef.current.getBoundingClientRect()?.width) 
        if(isNaN(loginWidth)) {
            return ""
        }
        const loginMidpoint = loginWidth / 2.0
        const center = loginMidpoint - 12.5
        return center+"px"
    }

    handleIconClick(event) {
        const inputIcon = event.target.dataset.inputicon
        if(inputIcon === "email-input") {
            this.emailRef.current.focus()
        }
        switch(inputIcon) {
            case "email-input":
                this.emailRef.current.focus()
                break
            case "password-input":
                this.passwordRef.current.focus()
                break
            default:
                return
        }
    }
    render() {
        return (<div className="nhl-form-container login-form-container">
                    <form ref={this.formRef}onSubmit={this.handleSubmit} className="nhl-form login-form">                  
                        <label className="nhl-form-label login-email-label" htmlFor="email-input">Email</label>
                        <i className="fa-regular fa-envelope input-icon" data-inputicon="email-input" onClick={this.handleIconClick}></i>
                        <input ref={this.emailRef} className="nhl-form-input" id="email-input" name="email" type="email" placeholder="Email" value={this.props.formData.email} onChange={this.handleFormChange} required/>
                        <label className="nhl-form-label login-password-label" htmlFor="password-input">Password</label>
                        <i className="fa-solid fa-lock input-icon" data-inputicon="password-input" onClick={this.handleIconClick}></i>
                        <input ref={this.passwordRef} className="nhl-form-input" id="password-input" name="password" type="password" placeholder="Password" value={this.props.formData.password} onChange={this.handleFormChange} minLength="10" required/>
                        {this.props.hasError && <span className="login-error-message">Error: no user found with this email and password. Please try again with different credentials.</span>}
                        {this.props.isLoading ?  <Spinner left={this.setSpinnerPosition()}/> : <button className="btn submit-btn" type="submit">Login</button>}
                    </form>
                    <button className="create-user-btn" onClick={this.handleCreateUserToggle}>Create an account</button>
                </div>)
    }
}