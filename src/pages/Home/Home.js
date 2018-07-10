import React from 'react'
import PropTypes from 'prop-types'
import HomeTop from './components/HomeTop/HomeTop'
import HomeContent from './components/HomeContent/HomeContent'
import Page from 'components/Page/Page'
import { connect } from 'react-redux'
import { postsLoad } from 'actions/posts'
import { setPageLoaded } from 'actions/app'
import Helmet from 'react-helmet'
import { getTitleFromSettings } from 'utils/template'

const loadVideo = () => new Promise(resolve => {
  const readyChecker = setInterval(() => {
    const videoBgElement = document.getElementById('video-bg')

    if (videoBgElement && videoBgElement.readyState >= 3) {
      resolve()
      clearInterval(readyChecker)
    }
  }, 300)
})

class Home extends React.Component {
  static propTypes = {
    postsLoad: PropTypes.func.isRequired,
    setPageLoaded: PropTypes.func
  }

  componentWillMount () {
    this.props.postsLoad({
      page: 1
    })
  }

  componentDidMount () {
    loadVideo().then(() => this.props.setPageLoaded(true))
  }

  render () {
    return (
      <Page>w
        <Helmet>
          <title>
            {getTitleFromSettings()}
          </title>
        </Helmet>
        <HomeTop />
        <HomeContent />
      </Page>
    )
  }
}

const mapActionsToProps = {
  postsLoad,
  setPageLoaded
}

export default connect(
  null,
  mapActionsToProps
)(Home)
