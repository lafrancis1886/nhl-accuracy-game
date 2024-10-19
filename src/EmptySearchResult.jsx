import './css/EmptySearchResult.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'

export default class EmptySearchResult extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)
    }

    handleResetClick(event) {
        this.props.onFilterResetClick(event)
    }

    render() {
        return <div className="empty-search-section">
            <img className="empty-set-icon" src="empty-set.svg" alt="empty set icon" />
            <h2 className="empty-search-title">No players found</h2>
            <p className="empty-search-description">There were no players found with that search term and set of filters. Try removing some for better results.</p>
            <button className="filter-reset-btn" onClick={this.handleResetClick}>Clear Search and Filters</button>
        </div>
    }
}