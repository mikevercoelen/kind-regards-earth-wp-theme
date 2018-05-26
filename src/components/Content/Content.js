import React from 'react'
import PropTypes from 'prop-types'
import styles from './Content.scss'
import cx from 'classnames'

const Content = ({ children, narrow, className }) => (
  <div
    className={cx(styles.component, {
      [className]: className,
      [styles.narrow]: narrow
    })}>
    {children}
  </div>
)

Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  narrow: PropTypes.bool
}

export default Content
