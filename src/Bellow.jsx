import './css/Bellow.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'


class Bellow extends React.Component {
    constructor(props) {
        super(props) 
        bindAllNonReactPrototypeMethods(this)
    }


    handleBellowHeaderClick(event) {
        this.props.onBellowClick(event, this.props.innerRef)
    }

    render() {

        return <div className="bellow-container">
            <div className="bellow-header-section" onClick={this.handleBellowHeaderClick}>
                <div className="bellow-header-expand-collapse-icon is-closed">
                    <i className="fa-solid fa-plus"></i>
                    <i className="fa-solid fa-minus"></i>
                </div>
                <h3 className="bellow-header-title">{this.props.title}</h3>
            </div>
            <div ref={this.props.innerRef} className="bellow-items-section">
                {this.props.bellowItems}
            </div>
        </div>
    }
}

export default React.forwardRef((props, ref) => <Bellow innerRef={ref}  {...props} />)
