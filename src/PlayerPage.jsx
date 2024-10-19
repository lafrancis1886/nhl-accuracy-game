import './css/PlayerPage.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'
import PlayerHeader from './PlayerHeader'
import PlayerGames from './PlayerGames'

export default class PlayerPage extends React.Component {
    constructor(props) {
        super(props)

        bindAllNonReactPrototypeMethods(this)
    }

    render() {
        return  <div className="player-page-container">
                    <PlayerHeader player={this.props.player} />
                    <PlayerGames player={this.props.player} />
                </div>
    }
}