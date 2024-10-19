import './css/SiteFooter.scss'
import React from 'react'

export default class SiteFooter extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="site-footer-container">
            <div className="version">
                Version 1.0 - NHL Accuracy Game
            </div>
            <div className="developer">
                Built and designed by Jeff LaFrancis
            </div>
        </div>
    }

}