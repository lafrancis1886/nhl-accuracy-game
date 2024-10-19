import React from 'react'
import './css/PlayerTag.scss'
import { bindAllNonReactPrototypeMethods } from './util/util'


const BACKGROUND_SHOOTS_COLOR_MAP = {
    "R": "#2400FF80",
    "L": "#03973E80",

}

const BACKGROUND_POSITION_COLOR_MAP = {
    "C": "#FF00B880",
    "L": "#FF000080",
    "R": "#FF000080",
    "D": "#AEEC0080"
}

const ALT_SHOOTS_DEFINITION_MAP = {
    "L": "Shoots left",
    "R": "Shoots right",
}

const ALT_POSITION_DEFINITION_MAP = {
    "C": "Plays center",
    "L": "Plays left wing",
    "R": "Plays right wing",
    "D": "Plays defense"
}

const SRC_SHOOTS_SVG_MAP = {
    "L": "shoots-left.svg",
    "R": "shoots-right.svg",
}

const SRC_POSITION_SVG_MAP = {
    "C": "position-center.svg",
    "L": "position-wing.svg",
    "R": "position-wing.svg",
    "D": "position-defense.svg"
}


export default class PlayerTag extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)
    }

    pickBackgroundColor() {
        if(this.props.group === "shoots") {
            return BACKGROUND_SHOOTS_COLOR_MAP[this.props.tag]
        } else if(this.props.group == "position") {
            return BACKGROUND_POSITION_COLOR_MAP[this.props.tag]
        }
    }

    pickAltDefinition() {
        if(this.props.group === "shoots") {
            return ALT_SHOOTS_DEFINITION_MAP[this.props.tag]
        } else if(this.props.group == "position") {
            return ALT_POSITION_DEFINITION_MAP[this.props.tag]
        }
    }

    pickSrcSvg() {
        if(this.props.group === "shoots") {
            return SRC_SHOOTS_SVG_MAP[this.props.tag]
        } else if(this.props.group == "position") {
            return SRC_POSITION_SVG_MAP[this.props.tag]
        }
    }
    render() {
        return <div className="player-tag" style={{"backgroundColor": this.pickBackgroundColor()}}>
                    <img className="player-tag-image" style={{"fill": this.pickBackgroundColor()}} src={this.pickSrcSvg()} alt={this.pickAltDefinition()} />
               </div>
    }
}