import React from 'react'
import PropTypes from 'prop-types'
import IconBase from 'components/IconBase/IconBase'

const IconNext = ({ className }) => (
  <IconBase
    className={className}
    width={28}
    height={45}>
    <path
      d='M40 27.361L44.95 22.412L22.485 -1.19019e-06L-6.10352e-07 22.412L4.95 27.361L22.485 9.827L40 27.361Z'
      transform='rotate(90 13.84 13.84)' />
  </IconBase>
)

IconNext.propTypes = {
  className: PropTypes.string
}

export default IconNext
