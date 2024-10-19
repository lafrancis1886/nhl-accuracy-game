import './css/ReviewBellow.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'
import ReviewBellowItem from './ReviewBellowItem'

export default class ReviewBellow extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)
    }

    render() {
        const reviewBellowItems = this.props.bellowItems.map(reviewBellow => {
            return <ReviewBellowItem key={reviewBellow.id} data={reviewBellow} />
        })
        return <ul className="review-bellow-list-container">
                {reviewBellowItems}
               </ul>
    }
}