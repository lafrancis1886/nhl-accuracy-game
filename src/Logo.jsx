import './css/Logo.scss'
import React from 'react'
import nhlLogo from './assets/nhl_internal.svg'

export default class Logo extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        return <div className="logo-container">
            <img className="logo-image" src={nhlLogo} alt="NHL logo" />
            <h1 className="logo-title">Know the ol' show?</h1>
        </div>
    }
}
