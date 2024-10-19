import './css/Frame.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'

class Frame extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)
    }

    componentDidMount() {

    }
    handleFrameClick(event) {
        this.props.onFrameClick(event)
    }

    render() {
        return <img src={this.props.frame.image} alt={this.props.frame.alt} id={this.props.frame.id} ref={this.props.innerRef} style={{height: this.props.height, width: this.props.width, display: "block", border: "0", margin: "0", padding: "0", cursor: "pointer", opacity: "1", position: "relative", objectFit: "contain"}}  onClick={this.handleFrameClick}></img>
    }
}

export default React.forwardRef((props, ref) => <Frame innerRef={ref} {...props} />)