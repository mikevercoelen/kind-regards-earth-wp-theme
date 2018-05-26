import React from 'react'
import PropTypes from 'prop-types'
import IconBase from 'components/IconBase/IconBase'

const IconComments = ({ className }) => (
  <IconBase
    className={className}
    width={22}
    height={23}>
    <path d='M22 0H0V16H4V23L12 16H22V0ZM20 14H12L6 19V14H2V2H20V14Z' transform='matrix(-1 0 0 1 22 0)' />
  </IconBase>
)

IconComments.propTypes = {
  className: PropTypes.string
}

export default IconComments
