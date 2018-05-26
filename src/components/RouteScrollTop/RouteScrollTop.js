import { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { rootElement } from '../../index'

class RouteScrollTop extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object
  }

  componentDidUpdate (prevProps) {
    if (!this.props.location !== prevProps.location) {
      rootElement.focus()
      window.scrollTo(0, 0)
    }
  }

  render () {
    return this.props.children
  }
}

export default withRouter(RouteScrollTop)
