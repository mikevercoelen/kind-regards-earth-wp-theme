/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Top from './components/Top/Top'
import Inner from './components/Inner/Inner'
import { connect } from 'react-redux'
import { postLoadBySlug } from 'actions/posts'
import { postToArticle } from 'utils/formatting'
import qs from 'qs'

import {
  getPostBySlug
} from 'selectors/entities'

class Post extends React.Component {
  static propTypes = {
    postLoadBySlug: PropTypes.func,
    post: PropTypes.object,
    slug: PropTypes.string,
    match: PropTypes.object,
    previewId: PropTypes.number
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

  render () {
    const { post } = this.props

    const article = postToArticle(post)

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

  const query = location.search.replace('?', '')
  const previewId = qs.parse(query).preview_id || null

  return {
    slug,
    post: getPostBySlug(slug)(state),
    previewId
  }
}

const mapActionsToProps = {
  postLoadBySlug
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Post)
