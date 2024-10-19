import './css/PlayerCard.scss'
import React from 'react'
import PlayerTag from './PlayerTag'
import { bindAllNonReactPrototypeMethods } from './util/util'


export default class PlayerCard extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)
        this.lastPlayerRef = React.createRef()
    }

    componentDidMount() {
        if(this.props.observe && this.props.observer) {
            this.props.observer.observe(this.lastPlayerRef.current)
        }
    }

    componentWillUnmount() {
        if(this.props.observe && this.props.observer) {
            this.props.observer.unobserve(this.lastPlayerRef.current)
        }
    }

    handlePlayerLink(event) {
        this.props.onPlayerSelect(event)
    }
    render() {
        const positionCodes = this.props.player.positionCodes.map(code => {
            return <PlayerTag key={code} tag={code} group="position" />
        });
        const playerShoots = this.props.player.shootsCatches.map(shoot => {
            return <PlayerTag key={shoot} tag={shoot} group="shoots" />
        });


        return <div ref={this.props.observe && this.props?.observer ? this.lastPlayerRef : null} className='player-container'>
                    <a className="player-card-grid" href={`/players/${this.props.player.playerId}`} alt={this.props.player.skaterFullName} onClick={this.handlePlayerLink}>
                        <img className="player-img" src={this.props.player.pngUrl} alt={this.props.player.skaterFullName} />
                        <h5 className="player-name">{this.props.player.skaterFullName}</h5>
                        <div className="position-codes">
                            {positionCodes}
                        </div>
                       <div className="player-shoots">
                            {playerShoots}
                       </div>
                        
                    </a>
                </div>
    }
}