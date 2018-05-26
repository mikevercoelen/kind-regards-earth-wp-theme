import React from 'react'
import PropTypes from 'prop-types'
import { injectStyle } from '../../utils/dom'

const defaultAnimation = `{
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}`

export default class Blanket extends React.Component {
  static propTypes = {
    delay: PropTypes.number,
    duration: PropTypes.number,
    delayOffset: PropTypes.number,
    initialStyle: PropTypes.object,
    completionStyle: PropTypes.object,
    animation: PropTypes.string,
    animationName: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    delay: 0,
    duration: 0.35,
    delayOffset: 0.1,
    initialStyle: { opacity: 0 },
    completionStyle: {},
    animation: defaultAnimation,
    animationName: 'blanketAnimationFadeIn'
  }

  constructor (props) {
    super(props)

    this.state = {
      animationFinished: []
      // array of booleans for each child to determine displaying animation styles
    }

    const { animation, animationName } = this.props
    const appliedAnimation = `@keyframes ${animationName} ${animation}`

    injectStyle(appliedAnimation)
  }

  reset = () => {
    this.setState({
      animationFinished: []
    })
  }

  applyAnimationStyle = (child, index) => {
    const {
      initialStyle,
      animationName,
      duration,
      delay,
      delayOffset
    } = this.props

    const style = {
      ...child.props.style,
      animationName: animationName,
      animationDuration: `${duration}s`,
      animationDelay: `${delay + index * delayOffset}s`,
      animationFillMode: 'forwards',
      ...initialStyle
    }

    // Animation finish time
    const finishTime = (delay + index * delayOffset + duration) * 1000

    // Set the animation finish boolean to true when the animation completes
    setTimeout(
      () =>
        this.setState(prevState => {
          let animationFinished = prevState.animationFinished.slice()
          animationFinished[index] = true

          return {
            animationFinished
          }
        }),
      finishTime
    )

    return React.cloneElement(child, { style })
  }

  applyCompletionStyle = (child) => {
    const { completionStyle } = this.props

    const style = {
      ...child.props.style,
      ...completionStyle
    }

    return React.cloneElement(child, { style })
  }

  render () {
    const { children } = this.props

    return React.Children.map(children, (child, index) => {
      if (this.state.animationFinished[index]) {
        return this.applyCompletionStyle(child, index)
      } else {
        return this.applyAnimationStyle(child, index)
      }
    })
  }
}
