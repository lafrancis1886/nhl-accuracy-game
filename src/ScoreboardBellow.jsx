import './css/ScoreboardBellow.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'
import ScoreboardBellowItem from './ScoreboardBellowItem'


export default class ScoreboardBellow extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)
    }


    render() {
        const scoreboardListItems = this.props.bellowItems.map(bellowItem => {
            return <ScoreboardBellowItem key={bellowItem.id} data={bellowItem} />
        })
        return <ul className="scoreboard-bellow-list-container">
                {scoreboardListItems}
               </ul>
    }
}

