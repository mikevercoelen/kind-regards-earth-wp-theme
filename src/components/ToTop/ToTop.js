import React from 'react'
import styles from './ToTop.scss'
import _ from 'lodash'
import cx from 'classnames'
import SmoothScroll from 'smooth-scroll'

const scroll = new SmoothScroll()

const TO_TOP_SCROLL_BREAKPOINT = 300

export default class ToTop extends React.Component {
  state = {
    hasScrolledDown: false
  }

  handleScroll = () => {
    const { hasScrolledDown } = this.state
    const scrollTop = document.documentElement.scrollTop

    if (!hasScrolledDown && scrollTop >= TO_TOP_SCROLL_BREAKPOINT) {
      this.setState({ hasScrolledDown: true })
    } else if (hasScrolledDown && scrollTop <= TO_TOP_SCROLL_BREAKPOINT) {
      this.setState({ hasScrolledDown: false })
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', _.throttle(this.handleScroll, 200))
  }

  componentWillMount () {

  }

  handleBtnClick = () => {
    scroll.animateScroll(0)
  }

  render () {
    const { hasScrolledDown } = this.state

    return (
      <div
        onClick={this.handleBtnClick}
        className={cx(styles.component, {
          [styles.hasScrolledDown]: hasScrolledDown
        })}>
        <svg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='53px' height='20px' viewBox='0 0 53 20' enableBackground='new 0 0 53 20' xmlSpace='preserve'>
          <g id='Ebene_3' />
          <g>
            <polygon points='43.886,16.221 42.697,17.687 26.5,4.731 10.303,17.688 9.114,16.221 26.5,2.312' />
          </g>
        </svg>
      </div>
    )
  }
}
