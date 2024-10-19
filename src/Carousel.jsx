import './css/Carousel.scss'
import React from 'react'
import { bindAllNonReactPrototypeMethods, generateId } from './util/util'
import Frame from './Frame.jsx'
import Dot from './Dot.jsx'

const SLIDE_BY_PERCENTAGE = .35 


export default class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentFrameIndex: 0
        }
        this.frameRefs = []
        this.props.frames.forEach(f => {
            this.frameRefs.push(React.createRef())
        })
        this.carouselRef = React.createRef()
        bindAllNonReactPrototypeMethods(this)
        this.slideBy = SLIDE_BY_PERCENTAGE * parseInt(this.props.width)
    }

    setInitialFramePlacement() {
        const element = this.carouselRef.current
        element.style.gridTemplateColumns = `1em ${this.props.width}px 1em`
        element.style.gridTemplateRows = `4em ${this.props.height}px 1em`

        for(let index = 0; index < this.frameRefs.length; index++) {
            const ref = this.frameRefs[index]
            const topAdjust = -1 * index * parseInt(this.props.height)
            const keepAllButFirstOneSlideRight = index > 0 ? 1 : 0
            const leftAdjust = keepAllButFirstOneSlideRight * this.slideBy
            const frameStyle = ref.current.style
            frameStyle.top = `${topAdjust}px`
            frameStyle.left = `${leftAdjust}px`
            frameStyle.transition = `250ms`
            frameStyle.transform = 'translateX(0px)'
            if(index === this.state.currentFrameIndex) {
                frameStyle.opacity = '1'
                frameStyle.zIndex = '1'
            } else {
                frameStyle.opacity = '0'
                frameStyle.zIndex = '-1'
            }
        }
    }
    componentDidMount() {
        this.setInitialFramePlacement()
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(Math.abs(nextState.currentFrameIndex - this.state.currentFrameIndex) >= 1) {
            return false
        }
        return true
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setInitialFramePlacement()
        if(this.state.currentFrameIndex > 0) {
            this.shiftFromCurrentToTarget(0, this.state.currentFrameIndex, false)
        }
    }

    handleRightClick(event) {
        if(this.state.currentFrameIndex === this.props.frames.length - 1) {
            return
        }
        for(let i = 0; i < this.props.frames.length; i++) {
            const currentFrameStyle = this.frameRefs[i].current.style
            const lastTranslationArray = this.frameRefs[i].current.style.transform?.match(/(\-?\d+)/g)
            const translateX = (Array.isArray(lastTranslationArray) && lastTranslationArray.length === 1) ?
                            parseInt(lastTranslationArray[0]) - (this.slideBy) : -1 * this.slideBy

            if(i === this.state.currentFrameIndex) {
                currentFrameStyle.opacity = 0
                currentFrameStyle.transform = `translateX(${translateX}px)`
                currentFrameStyle.zIndex = '-1'
            } else if(i === (this.state.currentFrameIndex + 1)) {
                currentFrameStyle.opacity = 1
                currentFrameStyle.transform = `translateX(${translateX}px)` //`translateX(-${leftFromStyle}px)`
                currentFrameStyle.zIndex = '1'
            } 
        }

        this.setState(prevState => {
            return {
                currentFrameIndex: prevState.currentFrameIndex + 1
            }
        })
    }

    handleLeftClick(event) {
        if(this.state.currentFrameIndex === 0) {
            return 
        }

        for(let index = 0; index < this.props.frames.length; index++) {
            const currentFrameStyle = this.frameRefs[index].current.style;
            const lastTranslationArray = this.frameRefs[index].current.style.transform?.match(/(\-?\d+)/g);
            const translateX = (Array.isArray(lastTranslationArray) && lastTranslationArray.length === 1) ? 
                        parseInt(lastTranslationArray[0]) + (this.slideBy) : this.slideBy
         
            if(index === this.state.currentFrameIndex) {
                currentFrameStyle.opacity = '0'
                currentFrameStyle.transform = `translateX(${translateX}px)` 
                currentFrameStyle.zIndex = '-1'
            } else if(index === this.state.currentFrameIndex - 1) {
                currentFrameStyle.opacity = '1'
                currentFrameStyle.transform = `translateX(${translateX}px)` 
                currentFrameStyle.zIndex = '1'
            } 
        }

        this.setState(prevState => {
            return {
                currentFrameIndex: prevState.currentFrameIndex - 1
            }
        })
    }

    shiftFromCurrentToTarget(currentIndex, targetIndex, updateState = true) {
        const translationMultiplier = currentIndex - targetIndex

        this.frameRefs[currentIndex].current.style.opacity = '0'
        this.frameRefs[currentIndex].current.style.zIndex = '-1'
        setTimeout(() => {
            for(let i = 0 ; i < this.props.frames.length; i++) {
                const frameElement = this.frameRefs[i].current
                const currentTranslationArray = frameElement.style.transform.match(/(\-?\d+)/g)
                const currentTranslation = (Array.isArray(currentTranslationArray) && currentTranslationArray.length === 1) ? parseInt(currentTranslationArray[0]): 0

                if((i <= targetIndex && i >= currentIndex) || (i >= targetIndex && i <= currentIndex)) {
                    let translation = undefined
                    if(i === targetIndex || i === currentIndex) { //move 1
                        const leftRight = translationMultiplier > 0 ? 1 : -1
                        translation = ( leftRight * this.slideBy) + currentTranslation
                    } else {
                        const leftRightDouble = translationMultiplier > 0 ? 2 : -2 
                        translation = (leftRightDouble * this.slideBy) + currentTranslation
                    }
                    frameElement.style.opacity = '0'
                    frameElement.style.transform = `translateX(${translation}px)`
                    frameElement.style.zIndex = '-1'
                }

            }

            setTimeout(() => {
                this.frameRefs[targetIndex].current.style.opacity = '1'
                this.frameRefs[targetIndex].current.style.zIndex = '1'
            }, 300)

            if(updateState) {
                this.setState(prevState => {
                    return {
                        currentFrameIndex: targetIndex
                    }
                })
            }

        }, 100)

    }
    handleDotClick(event) {
        const dotButton = event.target.closest('.dot-button')
        const frameId = dotButton.dataset.frameid
        const targetIndex = this.frameRefs.findIndex(ref => ref.current.id === frameId)

        if((this.state.currentFrameIndex - targetIndex) !== 0 ) {
            this.shiftFromCurrentToTarget(this.state.currentFrameIndex, targetIndex)
        }
    }

    handleFrameClick(event) {

    }


    render() {

        const frames = []
        const dots = []
        this.props.frames.forEach((frame, index) => {
            const id = generateId(10)
            const frameId = frame.id
             frames.push(<Frame innerRef={this.frameRefs[index]} key={id} frame={frame} height={`${this.props.height}px`} width={`${this.props.width}px`} onFrameClick={this.handleFrameClick}/>)
             dots.push(<Dot key={id} frameId={frameId} onDotClick={this.handleDotClick} />)
        })

        return <div ref={this.carouselRef} className="carousel-outer-container">
                    <div className="carousel-title-section">
                        {this.props.title && <h2 className="carousel-title">{this.props.title}</h2>}
                    </div>
                    <div className="carousel-left-control-section">
                        <button className="carousel-control-button left-button" onClick={this.handleLeftClick}><i className="fa-solid fa-caret-left"></i></button>
                    </div>
                    <div className="carousel-right-control-section">
                        <button className="carousel-control-button right-button" onClick={this.handleRightClick}><i className="fa-solid fa-caret-right"></i></button>
                    </div>
                    <div className="carousel-inner-container">
                        {frames}
                    </div>
                    <div className="carousel-dots-container">
                        {dots}
                    </div>
               </div>
    }
}