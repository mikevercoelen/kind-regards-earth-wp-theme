import React from 'react'
import PropTypes from 'prop-types'
import styles from './ContinueReading.scss'
import Article from 'components/Article/Article'
import IconNextArrow from 'components/IconNextArrow/IconNextArrow'
import { getPostRoute } from 'utils/routes'
import { Link } from 'react-router-dom'

const ContinueReading = ({ article }) => {
  const next = article.next
  const previous = article.previous

  if (!next && !previous) {
    return null
  }

  return (
    <div className={styles.component}>
      <div className={styles.content}>
        {previous && (
          <div className={styles.previous}>
            <div className={styles.article}>
              <div className={styles.articleInner}>
                <Article
                  article={previous}
                  minimal />
              </div>
              <Link to={getPostRoute(previous.slug)} className={`${styles.btnControl} ${styles.btnPrevious}`}>
                <IconNextArrow
                  className={styles.btnControlIcon} />
                <div className={styles.btnControlLabel}>
                  Previous story
                </div>
              </Link>
            </div>
          </div>
        )}
        {next && (
          <div className={styles.next}>
            <div className={styles.article}>
              <div className={styles.articleInner}>
                <Article
                  article={next}
                  minimal />
              </div>
              <Link to={getPostRoute(next.slug)} className={`${styles.btnControl} ${styles.btnNext}`}>
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
  article: PropTypes.object
}

export default ContinueReading
