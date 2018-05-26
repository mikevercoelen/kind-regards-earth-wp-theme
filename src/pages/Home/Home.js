import React from 'react'
import PropTypes from 'prop-types'
import HomeTop from './components/HomeTop/HomeTop'
import HomeContent from './components/HomeContent/HomeContent'
import Page from 'components/Page/Page'
import { setPageLoaded } from 'actions/app'
import { connect } from 'react-redux'
import { postsLoad, categoriesLoad, mediaLoad } from 'actions/posts'
import { getHasPostsLoaded } from 'selectors/posts'

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
    setPageLoaded: PropTypes.func,
    postsLoad: PropTypes.func.isRequired,
    categoriesLoad: PropTypes.func.isRequired,
    mediaLoad: PropTypes.func.isRequired,
    hasPostsLoaded: PropTypes.bool.isRequired
  }

  componentWillReceiveProps (nextProps) {
    const { hasPostsLoaded, setPageLoaded } = nextProps

    if (hasPostsLoaded) {
      loadVideo().then(() => setPageLoaded(true))
    }
  }

  componentWillMount () {
    const { postsLoad, categoriesLoad, mediaLoad } = this.props

    categoriesLoad()
    mediaLoad()
    postsLoad()
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

const mapStateToProps = state => ({
  hasPostsLoaded: getHasPostsLoaded(state)
})

const mapActionsToProps = {
  setPageLoaded,
  postsLoad,
  categoriesLoad,
  mediaLoad
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home)
