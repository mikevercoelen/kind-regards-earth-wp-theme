import React from 'react'
import PropTypes from 'prop-types'
import SmoothScroll from 'smooth-scroll'
import styles from './ScrollDown.scss'
import IconNextArrow from 'components/IconNextArrow/IconNextArrow'

const scroll = new SmoothScroll()

export default class ScrollDown extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }

  handleScrollDownClick = e => {
    e.stopPropagation()
    const { to } = this.props
    const location = document.querySelector(to)
    scroll.animateScroll(location, null, {
      updateURL: false,
      popstate: false
    })
  }

  render () {
    const { label } = this.props

    return (
      <div
        onClick={this.handleScrollDownClick}
        className={styles.component}>
        <div className={styles.content}>
          <div className={styles.label}>
            {label}
          </div>
          <div className={styles.iconWrap}>
            <IconNextArrow
              className={styles.icon} />
          </div>
        </div>
      </div>
    )
  }
}
