import './css/Navigation.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods, NAVIGATION_PATHS} from './util/util'

export default class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isNavOpen: false
        }

        bindAllNonReactPrototypeMethods(this)

    }


    handleLogOut(event) {
        this.props.onLogOut(event)
    }

    showNavigation(event) {
        this.setState(prevState => {
            return {
                isNavOpen: true
            }
        })
    }

    hideNavigation(event) {
        this.setState(prevState => {
            return {
                isNavOpen: false
            }
        })
    }

    handleNavigation(event) {
        this.props.onNavigation(event)
    }

    render() {
        const navbarClass = this.state.isNavOpen ? 'navigation-bar is-open': 'navigation-bar is-closed'
        
        return <div className="navigation-container">
            <button className="header-btn show-navigation-button" onClick={this.showNavigation}><i className="fa-solid fa-bars"></i></button>
            <nav className={navbarClass}>
                <button className="header-btn close-navigation-button" onClick={this.hideNavigation}><i className="fa-solid fa-x"></i></button>
                <ul className="navigation-items">
                    <li className="navigation-item"><a className={this.props.currentPage === NAVIGATION_PATHS.GAME_CENTER ? "current-page navigation-link" : "navigation-link"} href='/nhl-game-center' onClick={this.handleNavigation}>Home</a></li>
                    <li className="navigation-item"><a className={this.props.currentPage === NAVIGATION_PATHS.ABOUT ? "current-page navigation-link" : "navigation-link"} href='/about' onClick={this.handleNavigation}>About Us</a></li>
                    <li className="navigation-item"><a className={this.props.currentPage === NAVIGATION_PATHS.PROFILE ? "current-page navigation-link" : "navigation-link"} href='/profile' onClick={this.handleNavigation}>Profile</a></li>
                </ul>
            </nav>
            <button className="header-btn log-out-button" onClick={this.handleLogOut}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
    }
}