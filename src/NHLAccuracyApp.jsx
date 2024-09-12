import React from 'react'
import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'
import ContainerHeader from './ContainerHeader'
import { queryForUser, createUser } from './firebase'

import Game from './Game'

export default class NHLAccuracyApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginFormData: {
                email: "",
                password: ""
            },
            user: {},
            createUserFormData: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            isLoginPage: true,
            isLoggedIn: false,
            isLoading: false,
            formSubmitError: false
        }

        //rewrite
        this.handleFormUpdate = this.handleFormUpdate.bind(this)
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
        this.handleCreateUserFormUpdate = this.handleCreateUserFormUpdate.bind(this)
        this.handleLoginFormUpdate = this.handleLoginFormUpdate.bind(this)
        this.handleSignInToggle = this.handleSignInToggle.bind(this)
        this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this)
    }

    handleSignInToggle() {
        this.setState(prevState => {
            return {
                isLoginPage: !prevState.isLoginPage
            }
        })
    }

    handleLoginFormUpdate(event) {
        this.handleFormUpdate(event, 'loginFormData')
    }
    handleCreateUserFormUpdate(event) {
        this.handleFormUpdate(event, 'createUserFormData')

    }
    handleFormUpdate(event, formObj) {
        const formInputName = event.target.name
        const formValue = event.target.value

        this.setState(prevState => {
            return {
                [formObj]: {
                    ...prevState[formObj],
                    [formInputName]: formValue
                }
            }
        })
    }

    async handleLoginSubmit(event) {
        this.setState(prevState => {
            return {
                isLoading: true
            }
        })

        const userDocRef = await queryForUser(this.state.loginFormData.email, this.state.loginFormData.password)

        this.setState(prevState => {
            if(userDocRef) {
                return {
                    user: {id: userDocRef.id, data: userDocRef.data()},
                    isLoggedIn: true,
                    isLoading: false,
                    formSubmitError: false
                }
            } else {
                return {
                    isLoggedIn: false,
                    isLoading: false,
                    formSubmitError: true
                }
            }
        })
    }

    async handleCreateUserSubmit(event) {
        this.setState(prevState => {
            return {
                isLoading: true
            }
        })

        const updatedUser = await createUser({...this.state.createUserFormData})

        this.setState(prevState => {
            if(updatedUser) {
                return {
                    user: {id: updatedUser.id, data: updatedUser.data()},
                    isLoading: false,
                    isLoggedIn: false,
                    isLoginPage: true,
                    formSubmitError: false
                }
            } else {
                return {
                    isLoading: false,
                    formSubmitError: true
                }
            }
        })
    

    }
    render() {
        return <div className="nhl-accuracy-app-container">
            { this.state.isLoginPage && !this.state.isLoggedIn && <ContainerHeader>
                <LogInForm isLoading={this.state.isLoading} hasError={this.state.formSubmitError} formData={this.state.loginFormData}
                     onFormSubmit={this.handleLoginSubmit} onFormChange={this.handleLoginFormUpdate} onCreateUserToggle={this.handleSignInToggle}/>
            </ContainerHeader> }
            { !this.state.isLoginPage && !this.state.isLoggedIn && <ContainerHeader>
                <SignUpForm isLoading={this.state.isLoading} hasError={this.state.formSubmitError} formData={this.state.createUserFormData} onFormSubmit={this.handleCreateUserSubmit} 
                        onFormChange={this.handleCreateUserFormUpdate} onLoginToggle={this.handleSignInToggle}/>
            </ContainerHeader> }
            {this.isLoggedIn && <Game />}
        </div>
    }
}