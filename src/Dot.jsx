import './css/Dot.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'

export default class Dot extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)
    }

    handleDotClick(event) {
        this.props.onDotClick(event)
    }
    render() {
        return <button className="dot-button" data-frameid={this.props.frameId} onClick={this.handleDotClick}><i className="fa-solid fa-circle"></i></button>
    }
}