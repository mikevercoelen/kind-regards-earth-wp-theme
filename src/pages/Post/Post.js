import React from 'react'
import PropTypes from 'prop-types'
import Top from './components/Top/Top'
import Inner from './components/Inner/Inner'
import { connect } from 'react-redux'
import { postLoadBySlug, categoriesLoad, mediaLoad } from 'actions/posts'
import { postToArticle } from 'utils/formatting'

import {
  getPostBySlug,
  getMedia,
  getCategories
} from 'selectors/entities'

class Post extends React.Component {
  static propTypes = {
    // postLoadBySlug: PropTypes.func,
    post: PropTypes.object
    // slug: PropTypes.string
  }

  componentDidUpdate () {
    this.loadPost(this.props)
  }

  componentWillMount () {
    this.loadPost(this.props)
  }

  loadPost = ({ postLoadBySlug, slug }) => {
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

  return {
    slug,
    post: getPostBySlug(slug)(state),
    media: getMedia(state),
    categories: getCategories(state)
  }
}

const mapActionsToProps = {
  postLoadBySlug,
  categoriesLoad,
  mediaLoad
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Post)
