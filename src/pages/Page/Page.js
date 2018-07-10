/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import ArticleTop from 'components/ArticleTop/ArticleTop'
import ArticleContent from 'components/ArticleContent/ArticleContent'
import { connect } from 'react-redux'
import { pageLoadBySlug } from 'actions/pages'
import { pageToArticle } from 'utils/formatting'
import qs from 'qs'
import { getPageBySlug } from 'selectors/entities'
import styles from './Page.scss'
import { setPageLoaded } from 'actions/app'

class Page extends React.Component {
  static propTypes = {
    pageLoadBySlug: PropTypes.func,
    setPageLoaded: PropTypes.func,
    page: PropTypes.object,
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

  loadPost = ({ previewId, pageLoadBySlug, slug }) => {
    // If we have a previewId, we use the preloaded page data
    if (previewId) {
      return
    }

    pageLoadBySlug(slug)
  }

  componentDidMount () {
    this.props.setPageLoaded(true)
  }

  render () {
    const { page } = this.props
    const article = pageToArticle(page)

    if (!article || (article.content === undefined)) {
      return null
    }

    return [
      <ArticleTop
        key='top'
        article={article} />,
      <ArticleContent
        hideDate
        noComments={!article.hasComments}
        key='content'
        article={article} />,
      <div className={styles.footerBorder} />
    ]
  }
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug

  const query = location.search.replace('?', '')
  const previewId = qs.parse(query).preview_id || null

  return {
    slug,
    page: getPageBySlug(slug)(state),
    previewId
  }
}

const mapActionsToProps = {
  pageLoadBySlug,
  setPageLoaded
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Page)
