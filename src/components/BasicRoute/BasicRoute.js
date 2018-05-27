import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import PageLoader from 'components/PageLoader/PageLoader'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import ToTop from 'components/ToTop/ToTop'
import { getIsLoaded } from 'selectors/app'
import { connect } from 'react-redux'

class BasicRoute extends React.Component {
  static propTypes = {
    component: PropTypes.func,
    isLoaded: PropTypes.bool.isRequired
  }

  render () {
    const {
      component: Component,
      isLoaded,
      ...rest
    } = this.props

    return (
      <Route {...rest} render={matchProps => [
        <PageLoader
          key='page-loader'
          isVisible={!isLoaded} />,
        <Header key='header' />,
        <Component
          key='content'
          {...matchProps} />,
        <Footer key='footer' />,
        <ToTop key='to-top' />
      ]} />
    )
  }
}

const mapStateToProps = state => ({
  isLoaded: getIsLoaded(state)
})

export default connect(
  mapStateToProps
)(BasicRoute)
