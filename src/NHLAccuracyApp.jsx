import React from 'react'
import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'
import ContainerHeader from './ContainerHeader'
import { queryForUser, createUser } from './util/firebase'
import { bindAllNonReactPrototypeMethods, NAVIGATION_PATHS } from './util/util'
import GameCenter from './GameCenter'

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
            pathname: '/',
            isLoggedIn: false,
            isLoading: false,
            formSubmitError: false
        }
        //Always call to bind all component prototype methods 
        bindAllNonReactPrototypeMethods(this)
    }

    isLoginPage() {
        if(this.state.pathname === '/' || this.state.pathname === '/login') {
            return true
        }
        return false
    }

    handleRouting(event) {
        const link = event.target.closest('a')
        if(!link) {
            return
        }
        if(link.origin !== location.origin) {
            return
        }

        event.preventDefault()
        const href = new String(link.href)
        const pathname = href.replace(/^http\:\/\/(\w+):?\d{0,4}/i,'')
        this.setState(prevState => {
            if(history.state.pathname !== pathname) {
                history.pushState(Object.assign(prevState, {pathname: pathname}), '', link)
            }
            return {
                pathname: pathname
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
                if(history.state.pathname !== "/nhl-game-center") {
                    history.pushState(Object.assign(prevState, {pathname: "/nhl-game-center", isLoggedIn: true, isLoading: false}), '', `/nhl-game-center`)
                }
                const styles = document.querySelector('#root').style
                styles.backgroundImage = 'none'
                styles.display = 'block'
                return {
                    user: {id: userDocRef.id, data: userDocRef.data()},
                    isLoggedIn: true,
                    isLoading: false,
                    formSubmitError: false,
                    pathname: "/nhl-game-center"
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
                if(history.state.pathname !== '/login') {
                    history.pushState(Object.assign(prevState, {pathname: '/login'}), '', `/login`)
                }
                return {
                    user: {id: updatedUser.id, data: updatedUser.data()},
                    isLoading: false,
                    isLoggedIn: false,
                    pathname: '/login',
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

    componentDidMount() {

        history.replaceState({...this.state}, '', location.href)
        this.popstateListener = (event) => {
            const state = event.state

            if(state) {
                if(/^\/{1}(login|createUser)+/i.test(state.pathname) || /^\/$/i.test(state.pathname)) {
                    const styles = document.querySelector('#root').style
                    styles.backgroundImage = 'url(\'../src/assets/ice.jpg\')';
                    styles.display = 'flex'
                    styles.justifyContent = 'center'
                    styles.alignItems = 'center'
                }
                this.setState(prevState => {
                    return state
                })
            }

        }
        window.addEventListener('popstate', this.popstateListener)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(/^\/{1}(login|createUser)+/i.test(this.state.pathname) || /^\/$/i.test(this.state.pathname)) {
            const styles = document.querySelector('#root').style
            styles.backgroundImage = 'url(\'src/assets/ice.jpg\')';
            styles.display = 'flex'
            styles.justifyContent = 'center'
            styles.alignItems = 'center'
        }
        
    }
    componentWillUnmount() {

        window.removeEventListener('popstate', this.popstateListener)
    }

    handleLogOut(event) {
        
        this.setState(prevState => {
            const newState = {
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
                    pathname: '/login',
                    isLoggedIn: false,
                    isLoading: false,
                    formSubmitError: false
                }

                if(prevState.pathname !== '/login') {
                    history.pushState(newState, '', '/login')
                }
                return newState
        })
    }

    inAppPaths() {
        return Object.values(NAVIGATION_PATHS).includes(this.state.pathname) || /^\/players\/\d{1,15}/i.test(this.state.pathname)
    }
    render() {
        return <div className="nhl-accuracy-app-container">
            { this.isLoginPage() && !this.state.isLoggedIn && <ContainerHeader>
                <LogInForm isLoading={this.state.isLoading} hasError={this.state.formSubmitError} formData={this.state.loginFormData}
                     onFormSubmit={this.handleLoginSubmit} onFormChange={this.handleLoginFormUpdate} onNavigateToCreateAccount={this.handleRouting}/>
            </ContainerHeader> }
            { this.state.pathname === '/createUser' && !this.state.isLoggedIn && <ContainerHeader>
                <SignUpForm isLoading={this.state.isLoading} hasError={this.state.formSubmitError} formData={this.state.createUserFormData} onFormSubmit={this.handleCreateUserSubmit} 
                        onFormChange={this.handleCreateUserFormUpdate} onNavigateToLogin={this.handleRouting} readOnlyMode={false} showLoginLink={true} buttonText={"Create Account"}/>
            </ContainerHeader> }
            {this.state.isLoggedIn && this.inAppPaths() && <GameCenter user={this.state.user} onLogOut={this.handleLogOut}/>}
        </div>
    }
}