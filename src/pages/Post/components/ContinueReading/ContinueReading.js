import React from 'react'
import PropTypes from 'prop-types'
import styles from './ContinueReading.scss'
import Article from '../../../../components/Article/Article'
import IconNextArrow from 'components/IconNextArrow/IconNextArrow'
import { getNextPost, getPreviousPost, getCategories, getMedia } from 'selectors/posts'
import { connect } from 'react-redux'
import { postToArticle } from 'utils/formatting'
import { getPostRoute } from 'utils/routes'
import { Link } from 'react-router-dom'

const ContinueReading = ({
  nextPost,
  previousPost,
  categories,
  media
}) => {
  if (!nextPost && !previousPost) {
    return null
  }

  return (
    <div className={styles.component}>
      <div className={styles.content}>
        {previousPost && (
          <div className={styles.previous}>
            <div className={styles.article}>
              <div className={styles.articleInner}>
                <Article
                  article={postToArticle(previousPost, categories, media)}
                  minimal />
              </div>
              <Link to={getPostRoute(previousPost.slug)} className={`${styles.btnControl} ${styles.btnPrevious}`}>
                <IconNextArrow
                  className={styles.btnControlIcon} />
                <div className={styles.btnControlLabel}>
                  Previous story
                </div>
              </Link>
            </div>
          </div>
        )}
        {nextPost && (
          <div className={styles.next}>
            <div className={styles.article}>
              <div className={styles.articleInner}>
                <Article
                  article={postToArticle(nextPost, categories, media)}
                  minimal />
              </div>
              <Link to={getPostRoute(nextPost.slug)} className={`${styles.btnControl} ${styles.btnNext}`}>
                <div className={styles.btnControlLabel}>
                  Next story
                </div>
                <IconNextArrow
                  className={styles.btnControlIcon} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

ContinueReading.propTypes = {
  nextPost: PropTypes.object,
  previousPost: PropTypes.object,
  categories: PropTypes.array,
  media: PropTypes.array
}

const mapStateToProps = state => ({
  nextPost: getNextPost(state),
  previousPost: getPreviousPost(state),
  categories: getCategories(state),
  media: getMedia(state)
})

export default connect(
  mapStateToProps
)(ContinueReading)
