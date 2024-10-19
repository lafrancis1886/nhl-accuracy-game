import './css/Search.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.searchRef = React.createRef()
        bindAllNonReactPrototypeMethods(this)
    }


    handleShowFilters(event) {
        this.props.onShowFilters(event)
    }

    handleInputIconClick(event) {
        const data = event.target.dataset.inputicon 
        if(data === 'player-search-input') {
            this.searchRef.current.focus()
        }
    }

    handleSearchChange(event) {
        this.props.onSearchChange(event)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.onSubmit(event)
    }

    render() {
        return <div role="search" className="player-grid-search">
            <form onSubmit={this.handleSubmit} className="player-grid-search-form">
                <i className="input-icon fa-solid fa-magnifying-glass" data-inputicon="player-search-input" onClick={this.handleInputIconClick}></i>
                <input ref={this.searchRef} className="player-search-form-input" id="player-search-input" name="playerSearch" type="search" placeholder="Search" value={this.props.searchValue} onChange={this.handleSearchChange} />
            </form>
            <button className="search-btn random-play-btn" onClick={this.handleRandomPlay}>
                <i className="fa-solid fa-dice-d20"></i> <strong className="button-label">Random Play</strong>
            </button>
            { this.props.showFiltersBtn && <button className="search-btn show-filters-btn" onClick={this.handleShowFilters}>
                <i className="fa-solid fa-filter"></i> <strong className="button-label">{this.props.isFilterOpen ? 'Hide Filters' : 'Show Filters'}</strong>
            </button> }
        </div>
    }
}