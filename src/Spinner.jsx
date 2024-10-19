import React from 'react'
import spinner from './assets/spinner.svg'
import './css/Spinner.scss'

export default class Spinner extends React.Component {
    constructor(props) {
        super(props)
        this.svgRef = React.createRef()
    }


    componentDidMount() {
        this.svgRef.current.style.animationPlayState='running'
    }

    componentWillUnmount() {
        this.svgRef.current.style.animationPlayState='paused'
    }

    render() {
        return <div className="spinner-container" style={{left: this.props.left}}>
            <img ref={this.svgRef} className="spinner-img" src={spinner} alt="Rotating hockey puck to signal wait." />
        </div>
    }
}