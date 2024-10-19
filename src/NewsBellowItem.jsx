import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'

export default class NewsBellowItem extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)
    }

    render() {
        return <li className="news-bellow-item-container">
            <h3 className="news-bellow-item-header">{this.props.data.title}</h3>
            <div className="news-bellow-item-body">
                <p>
                    {this.props.data.body}
                </p>
            </div>
        </li>
    }
}