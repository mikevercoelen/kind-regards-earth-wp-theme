import React from 'react'
import PropTypes from 'prop-types'
import HomeTop from './components/HomeTop/HomeTop'
import HomeContent from './components/HomeContent/HomeContent'
import Page from 'components/Page/Page'
import { connect } from 'react-redux'
import { postsLoad } from 'actions/posts'

class Home extends React.Component {
  static propTypes = {
    postsLoad: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.postsLoad({
      page: 1
    })
  }

  render () {
    return (
      <Page>
        <HomeTop />
        <HomeContent />
      </Page>
    )
  }
}

const mapActionsToProps = {
  postsLoad
}

export default connect(
  null,
  mapActionsToProps
)(Home)
