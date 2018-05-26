import React from 'react'
import PropTypes from 'prop-types'
import styles from './HomeContent.scss'
// import Filters from '../Filters/Filters'
import Article from '../../../../components/Article/Article'
import Content from 'components/Content/Content'
import Loader from 'components/Loader/Loader'
import { connect } from 'react-redux'
import { postsLoad, categoriesLoad, mediaLoad } from 'actions/posts'
import { postToArticle } from 'utils/formatting'
import InfiniteScroll from 'react-infinite-scroller'
import { getPage } from 'selectors/home'

import {
  getPosts,
  getCategories,
  getMedia,
  getHasAllPostDataLoaded,
  getTotalPages
} from 'selectors/posts'

class HomeContent extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    media: PropTypes.array.isRequired,
    postsLoad: PropTypes.func.isRequired,
    hasAllPostDataLoaded: PropTypes.bool,
    totalPages: PropTypes.number,
    page: PropTypes.number.isRequired
  }

  // TODO: re-enable pagination?
  get pagination () {
    return null

    // return (
    //   <div className={styles.pagination}>
    //     <div className={styles.paginationInner}>
    //       <div className={styles.paginationLabel}>
    //         Page:
    //       </div>
    //       <div className={styles.pages}>
    //         <div className={styles.page}>
    //           1
    //         </div>
    //         <div className={styles.page}>
    //           2
    //         </div>
    //         <div className={styles.page}>
    //           3
    //         </div>
    //         <div className={styles.page}>
    //           4
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // )
  }

  handleLoadMore = () => {
    this.props.postsLoad()
  }

  render () {
    const {
      posts,
      categories,
      media,
      hasAllPostDataLoaded,
      totalPages,
      page
    } = this.props

    if (!hasAllPostDataLoaded) {
      return (
        <div className={styles.component} id='articles'>
          <div className={styles.loader}>
            <Loader />
          </div>
        </div>
      )
    }

    // TODO: "empty placeholder?"
    if (posts.length === 0) {
      return null
    }

    const latestPost = posts[0]
    const articleRows = []

    for (let i = 1, postsLength = posts.length; i < postsLength; i++) {
      const post = posts[i]
      const nextPost = posts[i + 1]

      const nextPostElement = nextPost && (
        <div className={styles.article}>
          <Article article={postToArticle(nextPost, categories, media)} />
        </div>
      )

      articleRows.push((
        <div key={i} className={styles.articlesRow}>
          <div className={styles.article}>
            <Article article={postToArticle(post, categories, media)} />
          </div>
          {nextPostElement}
        </div>
      ))

      i++
    }

    const hasMore = page < totalPages
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
                article={postToArticle(latestPost, categories, media)} />
              {articleRows}
            </InfiniteScroll>
          </div>
          {this.pagination}
        </Content>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: getPosts(state),
  categories: getCategories(state),
  media: getMedia(state),
  hasAllPostDataLoaded: getHasAllPostDataLoaded(state),
  totalPages: getTotalPages(state),
  page: getPage(state)
})

const mapActionsToProps = {
  postsLoad,
  categoriesLoad,
  mediaLoad
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomeContent)
