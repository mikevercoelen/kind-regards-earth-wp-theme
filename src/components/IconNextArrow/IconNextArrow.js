import React from 'react'
import PropTypes from 'prop-types'
import IconBase from 'components/IconBase/IconBase'

const IconNextArrow = ({ className }) => (
  <IconBase
    className={className}
    width={65}
    height={57}>
    <path d='M64.3553 28.2843L36.0711 56.5685L29 49.4975L45.4975 33H0V23H44.9289L29 7.07107L36.0711 0L64.3553 28.2843Z' />
  </IconBase>
)

IconNextArrow.propTypes = {
  className: PropTypes.string
}

export default IconNextArrow
