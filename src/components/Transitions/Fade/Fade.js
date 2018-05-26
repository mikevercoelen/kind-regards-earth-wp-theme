import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import styles from './Fade.scss'
import cx from 'classnames'

const FadeDown = ({ in: inProp, className, children }) => (
  <Transition
    in={inProp}
    timeout={300}>
    {state => (
      <div
        className={cx(styles.component, {
          [className]: className,
          [styles[`component--${state}`]]: state
        })}>
        {children}
      </div>
    )}
  </Transition>
)

FadeDown.propTypes = {
  in: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
}

export default FadeDown
