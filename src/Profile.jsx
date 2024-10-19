import './css/Profile.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'
import SignUpForm from './SignUpForm'


export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            readOnlyMode: this.props.readOnlyMode,
            isLoading: false,
            formSubmitError: false,
            createUserFormData: {
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                email: this.props.user.email,
                password: this.props.user.password
            }
        }
        bindAllNonReactPrototypeMethods(this)
    }


    handleCreateUserFormUpdate(event) {
        const formInputName = event.target.name
        const formValue = event.target.value

        this.setState(prevState => {
            return {
                createUserFormData: {
                    ...prevState.createUserFormData,
                    [formInputName]: formValue
                }
            }
        })
    }

    handleCreateUserSubmit(event) {
        this.props.submitUpdate(event)
    }

    handleEditToggle(event) {
        this.setState(prevState => {
            return {
                readOnlyMode: !prevState.readOnlyMode
            }
        })
    }

    handleGoPlayClick(event) {
        this.props.onGoPlay(event)
    }

    render() {
        const joinDate = new Date(this.props.user.createtime)
        return <div className="profile-page-container">
                    <div className="profile-hero-section">
                        <h1 className="profile-welcome">Welcome {this.state.createUserFormData.firstName}</h1>
                        <p className="profile-join-date">Gamer since <strong className="join-date-style">{joinDate.toLocaleDateString()}</strong>! Make sure your profile is in tip-top shape for gaming. Perform all changes on this page and get ready to test your knowledge.</p>
                        <button className="go-play-button"><a className="go-play-link" href="/nhl-game-center" onClick={this.handleGoPlayClick}>go play</a></button>
                    </div>
                    <div className="profile-content-section">
                        <div className="profile-header">
                            <h2 className="profile-title">Profile</h2>
                            <button className="edit-profile-button" onClick={this.handleEditToggle}><i className="fa-solid fa-pencil"></i> Edit Profile</button>
                        </div>
                        <div className="profile-form">
                            <SignUpForm isLoading={this.state.isLoading} hasError={this.state.formSubmitError} formData={this.state.createUserFormData} onFormSubmit={this.handleCreateUserSubmit} 
                                onFormChange={this.handleCreateUserFormUpdate} showLoginLink={false} readOnlyMode={this.state.readOnlyMode} buttonText={"Update Account"} />
                        </div>
                    </div>
                </div>
    }
}
