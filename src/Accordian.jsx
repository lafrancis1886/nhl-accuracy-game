import React from 'react'
import { bindAllNonReactPrototypeMethods, generateId } from './util/util'
import Bellow from './Bellow'


export default class Accordian extends React.Component {
    constructor(props) {
        super(props)
        bindAllNonReactPrototypeMethods(this)

        this.state = {
            bellowsOpen: Array.prototype.fill.apply(new Array(this.props.children.length), [false])
        }

        this.bellowRefs = []
        for(let i = 0; i < this.props.children.length; i++) {
            this.bellowRefs.push(React.createRef())
        }

    }

    componentDidMount() {
        if(this.props.initExpandIndex !== undefined && this.bellowRefs.every(bellowRef => !bellowRef.current.classList.contains('is-open'))) {
            const expandIndex = this.props.initExpandIndex
            const currentRef = this.bellowRefs[expandIndex]
            this.handleBellowClick(undefined, currentRef)
        }
    }

    shouldComponentUpdate(prevProps, prevState, snapShot) {
        if(prevState.bellowsOpen === this.state.bellowsOpen || prevState.bellowsOpen !== this.state.bellowsOpen) {
            return false
        }
        return true;
    }

    handleBellowClick(event, currentRef) {
        const currentRefIndex = this.bellowRefs.findIndex(bellowRef => bellowRef === currentRef)
        const currentRefElement = this.bellowRefs[currentRefIndex].current
        const currentRefIsOpen = currentRefElement.classList.contains('is-open')

        const newBellowOpenStates = []
        this.bellowRefs.forEach((bellowRef, index) => {
            const bellowHeader = [...bellowRef.current.previousElementSibling.children].find(child => child.classList.contains('bellow-header-expand-collapse-icon'))
            if(index === currentRefIndex && !currentRefIsOpen) {
                const currentRefClassList = bellowRef.current.classList
                currentRefClassList.add('is-open')
                bellowRef.current.className = currentRefClassList
                newBellowOpenStates.push(true)
                if(!bellowHeader.classList.contains('is-open') && bellowHeader.classList.contains('is-closed')) {
                    bellowHeader.classList.remove('is-closed')
                    bellowHeader.classList.add('is-open') 
                }
            } else {
                const bellowRefIsOpen = bellowRef.current.classList.contains('is-open')
                if(bellowRefIsOpen) {
                    const currentClassList = bellowRef.current.classList
                    currentClassList.remove('is-open')
                }
                if(bellowHeader.classList.contains('is-open')) {
                    bellowHeader.classList.remove('is-open')
                }
                if(!bellowHeader.classList.contains('is-closed')) {
                    bellowHeader.classList.add('is-closed')
                }
                newBellowOpenStates.push(false) 
            }
        })
        
        this.setState(prevState => {
            return {
                bellowsOpen: newBellowOpenStates
            }
        })
            

    }

    render() {

        const bellows = this.props.children.map((child, index) => {
            const key = generateId(10)
            return <Bellow key={key} innerRef={this.bellowRefs[index]} title={this.props.titles[index]} onBellowClick={this.handleBellowClick} bellowItems={child} />
        })

        return <div className='accordian-container'>
                    {bellows}
               </div>
    }
}