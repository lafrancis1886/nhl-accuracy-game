import React from 'react'
import './css/ContainerHeader.scss'
import nhlImage from './assets/nhl_internal.svg'

export default class ContainerHeader extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return <div className="nhl-container-header">
                    <div className="icon-image">
                        <img className="nhl-icon" src={nhlImage} alt="NHL Logo Image" />
                    </div>
                    <div className="nhl-container-header-children">
                        {this.props.children}
                    </div>
                </div>
    }
}