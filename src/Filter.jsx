import React from 'react'
import { bindAllNonReactPrototypeMethods } from './util/util'


export default class Filter extends React.Component {
    constructor(props) {
        super(props)

        bindAllNonReactPrototypeMethods(this)
    }


    render() {
        return <div className="filter-container">
                    {this.props.children}
               </div>
    }
}