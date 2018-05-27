/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import ArticleTop from 'components/ArticleTop/ArticleTop'
import ArticleContent from 'components/ArticleContent/ArticleContent'
import ContinueReading from './components/ContinueReading/ContinueReading'
import { connect } from 'react-redux'
import { postLoadBySlug } from 'actions/posts'
import { postToArticle } from 'utils/formatting'
import qs from 'qs'
import { setPageLoaded } from 'actions/app'
import { getPostBySlug } from 'selectors/entities'

class Post extends React.Component {
  static propTypes = {
    postLoadBySlug: PropTypes.func,
    setPageLoaded: PropTypes.func,
    post: PropTypes.object,
    slug: PropTypes.string,
    match: PropTypes.object,
    previewId: PropTypes.string
  }

  componentDidUpdate () {
    this.loadPost(this.props)
  }

  componentWillMount () {
    this.loadPost(this.props)
  }

  loadPost = ({ previewId, postLoadBySlug, slug }) => {
    // If we have a previewId, we use the preloaded post data
    if (previewId) {
      return
    }

    postLoadBySlug(slug)
  }

  componentDidMount () {
    this.props.setPageLoaded(true)
  }

  render () {
    const { post } = this.props

    const article = postToArticle(post)

    if (!article) {
      return null
    }

    return [
      <ArticleTop
        key='top'
        article={article} />,
      <ArticleContent
        key='content'
        article={article} />,
      <ContinueReading
        key='continue-reading'
        article={article} />
    ]
  }
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug

  const query = location.search.replace('?', '')
  const previewId = qs.parse(query).preview_id || null

  return {
    slug,
    post: getPostBySlug(slug)(state),
    previewId
  }
}

const mapActionsToProps = {
  postLoadBySlug,
  setPageLoaded
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Post)
