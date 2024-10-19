import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'
import FilterRow from './FilterRow'

export default class FilterCategory extends React.Component {
    constructor(props) {
        super(props)

        bindAllNonReactPrototypeMethods(this)
    }

    handleFilterChange(event) {
        this.props.onFilterChange(event)
    }

    render() {
        const filterRows = this.props.filters.map(filter => {
            return <FilterRow key={filter.id} url={filter.url} label={filter.label} id={filter.id} category={this.props.title} isChecked={filter.isChecked} onFilterChange={this.handleFilterChange} />
        })
        return <div role="search" className="player-filter-category">
                    <h3 className="filter-category-title">{this.props.title}</h3>
                    <form className="filter-category-form">
                        {filterRows}
                    </form>
                </div>
    }
}