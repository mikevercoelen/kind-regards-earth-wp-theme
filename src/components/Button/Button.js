import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.scss'
import cx from 'classnames'

const Button = ({
  children,
  className,
  type = 'button',
  alt,
  ...props
}) => {
  return (
    <button
      className={cx(styles.component, {
        [className]: className,
        [styles.alt]: alt
      })}
      type={type}
      {...props}>
      <div className={styles.content}>
        {children}
      </div>
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  alt: PropTypes.bool
}

export default Button
