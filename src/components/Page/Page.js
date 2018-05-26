import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setPageLoaded } from 'actions/app'

class Page extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    setPageLoaded: PropTypes.func.isRequired
  }

  componentWillUnmount () {
    this.props.setPageLoaded(false)
  }

  render () {
    return this.props.children
  }
}

const mapStateToProps = null
const mapActionsToProps = {
  setPageLoaded
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Page)
