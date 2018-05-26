import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const IconBase = ({
  className,
  width,
  height,
  children
}) => (
  <svg
    className={cx({
      [className]: className
    })}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill='inherit' xmlns='http://www.w3.org/2000/svg'>
    {children}
  </svg>
)

IconBase.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node.isRequired
}

export default IconBase
