import React from 'react'
import PropTypes from 'prop-types'
import styles from './PageLoader.scss'
import Fade from '../Transitions/Fade/Fade'
import cx from 'classnames'
import { getAssetPath } from 'utils/template'

export default class PageLoader extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool
  }

  // updateProps (props) {
  //   const hasOpened = !this.props.isVisible && nextProps.isVisible
  //   const hasClosed = !hasOpened
  //
  //   if (hasOpened) {
  //     bodyElement.classList.add(styles.bodyMenuOpen)
  //   } else if (hasClosed) {
  //     bodyElement.classList.remove(styles.bodyMenuOpen)
  //   }
  // }

  render () {
    const { isVisible } = this.props

    return (
      <div
        className={cx(styles.component, {
          [styles.isVisible]: isVisible
        })}>
        <Fade in={isVisible}>
          <div className={styles.inner}>
            <img
              src={getAssetPath('public/images/logo-icon.svg')}
              className={styles.logo} />
          </div>
        </Fade>
      </div>
    )
  }
}
