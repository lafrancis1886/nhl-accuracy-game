import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'

export default class ReviewBellowItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <li className="review-bellow-item">
            <div className="review-bellow-item-header">
                <h3 className="review-bellow-item-header-reviewer">{this.props.data.reviewer}</h3>
                <div className="review-bellow-item-stars">
                    {this.props.data.stars}
                </div>
            </div>
            <div className="review-bellow-item-body">
                <p className="review-bellow-item-review">{this.props.data.review}</p>
            </div>
        </li>
    }
}