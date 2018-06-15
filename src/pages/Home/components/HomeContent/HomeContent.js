import React from 'react'
import PropTypes from 'prop-types'
import styles from './HomeContent.scss'
// import Filters from '../Filters/Filters'
import Article from '../../../../components/Article/Article'
import Content from 'components/Content/Content'
import Loader from 'components/Loader/Loader'
import { connect } from 'react-redux'
import { postsLoad } from 'actions/posts'
import { postToArticle } from 'utils/formatting'
import InfiniteScroll from 'components/InfiniteScroll/InfiniteScroll'
import { Map } from 'immutable'

import {
  getPostsSortedByDate
} from 'selectors/entities'

import {
  getHasMore,
  getHasInitiallyLoaded,
  getNextPage
} from '../../selectors'

class HomeContent extends React.Component {
  static propTypes = {
    posts: PropTypes.instanceOf(Map).isRequired,
    postsLoad: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    hasInitiallyLoaded: PropTypes.bool.isRequired,
    nextPage: PropTypes.number.isRequired
  }

  handleLoadMore = () => {
    const { nextPage } = this.props

    this.props.postsLoad({
      page: nextPage
    })
  }

  render () {
    const {
      posts,
      hasMore,
      hasInitiallyLoaded
    } = this.props

    if (!hasInitiallyLoaded) {
      return (
        <div className={styles.component} id='articles'>
          <div className={styles.loader}>
            <Loader />
          </div>
        </div>
      )
    }

    const postCount = posts.count()

    // TODO: "empty placeholder?"
    if (postCount === 0) {
      return null
    }

    const latestPost = posts.first()
    const postsArray = posts.valueSeq().toArray()
    const articleRows = []

    for (let i = 1, postsLength = postCount; i < postsLength; i++) {
      const post = postsArray[i]
      const nextPost = postsArray[i + 1]

      const nextPostElement = nextPost && (
        <div className={styles.article}>
          <Article article={postToArticle(nextPost)} />
        </div>
      )

      articleRows.push((
        <div key={i} className={styles.articlesRow}>
          <div className={styles.article}>
            <Article article={postToArticle(post)} />
          </div>
          {nextPostElement}
        </div>
      ))

      i++
    }

    const scrollLoader = (
      <div key='scroll-loader' className={styles.scrollLoader}>
        <Loader />
      </div>
    )

    return (
      <div className={styles.component} id='articles'>
        <Content>
          <div className={styles.articles}>
            <InfiniteScroll
              loadMore={this.handleLoadMore}
              hasMore={hasMore}
              loader={scrollLoader}
              pageStart={0}>
              <Article
                key='article-latest'
                isWide
                isLatest
                article={postToArticle(latestPost)} />
              {articleRows}
            </InfiniteScroll>
          </div>
        </Content>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: getPostsSortedByDate(state),
  hasMore: getHasMore(state),
  hasInitiallyLoaded: getHasInitiallyLoaded(state),
  nextPage: getNextPage(state)
})

const mapActionsToProps = {
  postsLoad
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomeContent)
