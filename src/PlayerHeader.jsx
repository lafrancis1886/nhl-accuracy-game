import React from 'react'
import { bindAllNonReactPrototypeMethods, POSTION_CODES, SHOOTS_CATCHES_CODES } from './util/util'

export default class PlayerHeader extends React.Component {
    constructor(props) {
        super(props)

        bindAllNonReactPrototypeMethods(this)
    }


    render() {
        const firstSeasonRaw = new String(Math.min(...this.props.player.seasonIds))
        const firstSeason = `${firstSeasonRaw.substring(0, 4)} - ${firstSeasonRaw.substring(4, firstSeasonRaw.length)}`
        const positions = [...this.props.player.positionCodes].map(pc => {
            if(Object.keys(POSTION_CODES).includes(pc)) {
                return POSTION_CODES[pc]
            }
            return undefined
        }).filter(pc => pc).join(",")
        const shoots = [...this.props.player.shootsCatches].map(s => {
            if(Object.keys(SHOOTS_CATCHES_CODES).includes(s)) {
                return SHOOTS_CATCHES_CODES[s]
            }
            return undefined
        }).filter(s => s).join(",")

        const teamAbbrev = this.props.player.teamAbbrevs[this.props.player.teamAbbrevs.length - 1]
        const logo = `https://assets.nhle.com/logos/nhl/svg/${teamAbbrev}_light.svg`
        return <div className="player-header-section">
                    <img className="player-profile-img" src={this.props.player.pngUrl} alt={this.props.player.skaterFullName} />
                    <div className="player-header-details">
                        <div className="player-header-detail-item"><span className="player-header-detail-item-label">Shoots: </span>{shoots}</div>
                        <div className="player-header-detail-item"><span className="player-header-detail-item-label">Position: </span>{positions}</div>
                        <div className="player-header-detail-item"><span className="player-header-detail-item-label">First NHL Season: </span>{firstSeason}</div>
                    </div>
                    <div className="player-header-title">
                        <h1 className="player-name">{this.props.player.skaterFullName}</h1>
                        <img className="player-team-logo" src={logo} alt={`${teamAbbrev} logo`} />
                    </div>
               </div>
    }
}