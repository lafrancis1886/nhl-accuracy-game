import './css/NewsBellow.scss'
import React from 'react'
import NewsBellowItem from './NewsBellowItem'
import { bindAllNonReactPrototypeMethods } from './util/util'


export default class NewsBellow extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)
    }

    render() {
        const newsBellowItems = this.props.bellowItems.map(bellowItem => {
            return <NewsBellowItem key={bellowItem.id} data={bellowItem} />
        })
        return <ul className="news-bellow-list-container">
            {newsBellowItems}
        </ul>
    }
}