import './css/SiteHeader.scss'
import React from 'react'
import Logo from './Logo.jsx'
import Navigation from './Navigation.jsx'
import { bindAllNonReactPrototypeMethods } from './util/util.js'


export default class SiteHeader extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)
    }

    handleNavigation(event) {
        this.props.onNavigation(event)
    }

    render() {
        return <header className="nhl-accuracy-game-site-header">
            <Logo />
            <Navigation onNavigation={this.handleNavigation} currentPage={this.props.currentPage} onLogOut={this.props.onLogOut}/>
        </header>
    }
}