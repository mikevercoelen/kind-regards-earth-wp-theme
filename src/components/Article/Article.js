import React from 'react'
import styles from './Article.scss'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Button from 'components/Button/Button'
import IconNext from 'components/IconNext/IconNext'
import { Link } from 'react-router-dom'
import { getPostRoute } from 'utils/routes'

const Article = ({ article, isWide, isLatest, minimal }) => {
  if (!article) {
    return null
  }

  let categoryLabel = ''

  if (article.categories) {
    const firstCategory = article.categories.first()
    categoryLabel = isLatest ? `Latest ${firstCategory.get('name')}` : firstCategory.get('name')
  }

  return (
    <div
      className={cx(styles.component, {
        [styles.isWide]: isWide,
        [styles.minimal]: minimal
      })}>
      {(!minimal && article.img && article.img.mediumLarge && article.img.mediumLarge.src) && (
        <div
          style={{
            backgroundImage: `url(${article.img.mediumLarge.src}`
          }}
          className={styles.articleImg} />
      )}
      <div className={styles.content}>
        <div className={styles.category}>
          {categoryLabel}
        </div>
        <h2
          className={styles.title}
          dangerouslySetInnerHTML={{
            __html: article.title
          }} />
        <div className={styles.subtitle}>
          {article.location && [
            <span
              key='location'
              className={styles.location}>
              {article.location}
            </span>,
            <span
              key='separator'
              className={styles.subtitleSeparator}>
              &nbsp;―&nbsp;
            </span>
          ]}
          <span className={styles.date}>
            {article.date}
          </span>
        </div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: article.description
          }} />
        <br />
        {!minimal && (
          <div className={styles.readingTime}>
            {article.readingTime} min read
          </div>
        )}
        {!minimal && (
          <Link to={getPostRoute(article.slug)}>
            <Button
              alt
              className={styles.btnReadMore}>
              Read the full story
              <IconNext className={styles.btnReadMoreIcon} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

Article.propTypes = {
  isWide: PropTypes.bool,
  isLatest: PropTypes.bool,
  minimal: PropTypes.bool,
  article: PropTypes.object
}

export default Article
