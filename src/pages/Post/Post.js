import React from 'react'
import PropTypes from 'prop-types'
import Top from './components/Top/Top'
import Inner from './components/Inner/Inner'
import { connect } from 'react-redux'
import { setPageLoaded } from 'actions/app'
import { getPostBySlug, getMedia, getCategories, getHasAllPostDataLoaded } from 'selectors/posts'
import { postLoadBySlug, categoriesLoad, mediaLoad } from 'actions/posts'
import { postToArticle } from 'utils/formatting'

class Post extends React.Component {
  static propTypes = {
    setPageLoaded: PropTypes.func,
    postLoadBySlug: PropTypes.func,
    post: PropTypes.object,
    slug: PropTypes.string,
    categories: PropTypes.array,
    media: PropTypes.array,
    categoriesLoad: PropTypes.func.isRequired,
    mediaLoad: PropTypes.func.isRequired,
    hasAllPostDataLoaded: PropTypes.bool
  }

  componentWillReceiveProps (nextProps) {
    const { hasAllPostDataLoaded, setPageLoaded } = nextProps

    if (hasAllPostDataLoaded) {
      setPageLoaded(true)
    }
  }

  componentDidUpdate () {
    const { postLoadBySlug, slug } = this.props

    postLoadBySlug(slug)
  }

  componentWillMount () {
    const { categoriesLoad, mediaLoad, postLoadBySlug, slug } = this.props

    categoriesLoad()
    mediaLoad()
    postLoadBySlug(slug)
  }

  render () {
    const { hasAllPostDataLoaded, media, categories, post } = this.props

    if (!hasAllPostDataLoaded) {
      return null
    }

    const article = postToArticle(post, categories, media)

    if (!article) {
      return null
    }

    return (
      <div>
        <Top article={article} />
        <Inner article={article} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug

  return {
    slug,
    post: getPostBySlug(slug)(state),
    media: getMedia(state),
    categories: getCategories(state),
    hasAllPostDataLoaded: getHasAllPostDataLoaded(state)
  }
}

const mapActionsToProps = {
  setPageLoaded,
  postLoadBySlug,
  categoriesLoad,
  mediaLoad
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Post)
