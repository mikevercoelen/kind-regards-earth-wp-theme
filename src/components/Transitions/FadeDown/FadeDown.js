import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import styles from './FadeDown.scss'
import cx from 'classnames'

const FadeDown = ({ in: inProp, children }) => (
  <Transition
    in={inProp}
    unmountOnExit
    timeout={300}>
    {state => (
      <div
        className={cx(styles.component, {
          [styles[`component--${state}`]]: state
        })}>
        {children}
      </div>
    )}
  </Transition>
)

FadeDown.propTypes = {
  in: PropTypes.bool,
  children: PropTypes.node
}

export default FadeDown
