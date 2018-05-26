import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import PageLoader from 'components/PageLoader/PageLoader'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import ToTop from 'components/ToTop/ToTop'

export default class BasicRoute extends React.Component {
  static propTypes = {
    component: PropTypes.func
  }

  render () {
    const {
      component: Component,
      ...rest
    } = this.props

    return (
      <Route {...rest} render={matchProps => [
        <PageLoader
          key='page-loader'
          isVisible={false} />,
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
