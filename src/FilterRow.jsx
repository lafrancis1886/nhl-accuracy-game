import './css/FilterRow.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'


export default class FilterRow extends React.Component {
    constructor(props) {
        super(props)

        bindAllNonReactPrototypeMethods(this)
    }


    handleCheckboxChange(event) {
        this.props.onFilterChange(event)
    }

    getBackgroundColorClass() {
        const category = this.props.category
        if(category === "Shoots") {
            switch(this.props.id) {
                case "lefty":
                    return "left-shot-background"
                case "righty":
                    return "right-shot-background"
                default:
                    return "left-shot-background"
            }
        }

        if(category === "Position") {
            switch(this.props.id) {
                case "left-wing":
                case "right-wing":
                    return "wing-position-background"
                case "center":
                    return "center-position-background"
                case "defense":
                    return "defense-position-background"
                default: 
                    return "wing-position-background"
            }
        }
        return ""
    }
    render() {
        const backgroundColorClass = this.getBackgroundColorClass()
        const filterRowClass = this.props.isChecked ? "filter-row-container-checked" : "filter-row-container-unchecked"
        const checkMarkClass = this.props.isChecked ? "checkmark fa-solid fa-check" : "hidden-checkmark fa-solid fa-check"
        const checkboxClass = this.props.isChecked ? "show-checkbox fa-regular fa-square" : "hide-checkbox fa-regular fa-square"
        const filterIconClass = this.props.isChecked ?  "hide-filter-icon" : this.props.category === "Teams" ? "show-team-filter-icon" : `show-cal-filter-icon ${backgroundColorClass}`;

        return  <div className={filterRowClass}>  
                    <i className={checkMarkClass} data-category={this.props.category} data-id={this.props.id} onClick={this.handleCheckboxChange}></i>
                    <i className={checkboxClass} data-category={this.props.category} data-id={this.props.id} onClick={this.handleCheckboxChange}></i>
                    <img className={filterIconClass} src={this.props.url} alt={this.props.label} data-category={this.props.category} data-id={this.props.id} onClick={this.handleCheckboxChange}/>
                    <input className="filter-row-checkbox" id={this.props.id} name={`filter-${this.props.id}`} data-category={this.props.category} data-id={this.props.id} type="checkbox" checked={this.props.isChecked} onChange={this.handleCheckboxChange} />
                    <label className="filter-row-label" htmlFor={this.props.id}>{this.props.label}</label>
                </div>
       

    }
}