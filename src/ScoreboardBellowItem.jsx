import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'


export default class ScoreboardBellowItem extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)
    }

    render() {
        return <li className="scoreboard-bellow-item-li">
                <div className="scoreboard-bellow-item-player-name">
                    {this.props.data.name}
                </div>
                <div className="scoreboard-bellow-item-player-score">
                    {this.props.data.score}
                </div>
        </li>
    }
}