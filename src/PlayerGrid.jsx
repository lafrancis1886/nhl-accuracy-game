import './css/PlayerGrid.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'
import EmptySearchResult from './EmptySearchResult'


export default class PlayerGrid extends React.Component {
    constructor(props) {
        super(props)

        bindAllNonReactPrototypeMethods(this)
    }

    handleResetClick(event) {
        this.props.onFilterResetClick(event)
    }

    render() {
        const heading = `${this.props.count} ${this.props.count === 1 ? 'Player' : 'Players'}`
        const gridClass = this.props.count === 0 ? 'player-empty-grid' : 'player-grid'
        return <div>
                    <div className="player-grid-header">
                        <h2 role="status" className="player-count-status">{heading}</h2>
                    </div>
                    <main role="main" className={gridClass}>
                        {this.props.count === 0 && <EmptySearchResult onFilterResetClick={this.handleResetClick} />}
                        {this.props.count > 0 && this.props.children}
                    </main>
                </div>
    }
}