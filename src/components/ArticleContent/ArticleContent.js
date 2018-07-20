import React from 'react'
import PropTypes from 'prop-types'
import styles from './ArticleContent.scss'
import Content from 'components/Content/Content'
import 'dropcap.js'
import IconComments from 'components/IconComments/IconComments'
import Disqus from 'disqus-react'
import { DISQUS_SHORT_NAME } from 'config'
import DocumentMeta from 'react-document-meta'
import he from 'he'
import stripTags from 'striptags'
import cx from 'classnames'
import Helmet from 'react-helmet'

export default class ArticleContent extends React.Component {
  static propTypes = {
    article: PropTypes.object,
    noComments: PropTypes.bool,
    topSpace: PropTypes.bool,
    hideDate: PropTypes.bool
  }

  state = {
    showComments: false
  }

  applyDropcap () {
    const dropcaps = document.querySelectorAll('.dropcap')

    dropcaps.forEach(cap => {
      if (cap.dcapjsStrut) {
        cap.dcapjsStrut = null
      }
    })

    window.Dropcap.layout(dropcaps, 5)
  }

  componentDidMount () {
    this.applyDropcap()
  }

  componentDidUpdate () {
    this.applyDropcap()
  }

  showComments = () => {
    this.setState({
      showComments: true
    })
  }

  get commentsButton () {
    const { showComments } = this.state
    const { article, noComments } = this.props

    if (noComments) {
      return null
    }

    const disqusConfig = {
      url: article.link,
      identifier: article.slug,
      title: article.title
    }

    if (showComments) {
      return (
        <div className={styles.comments}>
          <Disqus.DiscussionEmbed
            shortname={DISQUS_SHORT_NAME}
            config={disqusConfig} />
        </div>
      )
    }

    return (
      <div className={styles.btnCommentsWrap}>
        <button
          onClick={this.showComments}
          className={styles.btnComments}>
          <IconComments className={styles.btnCommentsIcon} />
          <div className={styles.btnCommentsLabel}>
            <Disqus.CommentCount
              shortname={DISQUS_SHORT_NAME}
              config={disqusConfig}>
              comments
            </Disqus.CommentCount>
          </div>
        </button>
      </div>
    )
  }

  get head () {
    const { article } = this.props

    const meta = {
      title: he.decode(`${article.title} – ${WPSettings.meta.title}`),
      description: he.decode(stripTags(article.description)),
      canonical: article.link
    }

    return (
      <React.Fragment>
        <DocumentMeta meta={meta} />
        <Helmet>
          <title>
            {meta.title}
          </title>
        </Helmet>
      </React.Fragment>
    )
  }

  render () {
    const { article, topSpace, hideDate } = this.props

    return (
      <article
        id='inner'
        className={cx(styles.component, {
          [styles.topSpace]: topSpace
        })}>
        {this.head}
        <Content className={styles.content}>
          <div className={styles.textContent}>
            {!hideDate && (
              <div className={styles.date}>
                {article.date}
              </div>
            )}
            <h1
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: article.title
              }} />
            {article.subtitle && (
              <h2 className={styles.subtitle}>
                {article.subtitle}
              </h2>
            )}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: article.content
            }}
            className={styles.articleContent} />
          {this.commentsButton}
        </Content>
      </article>
    )
  }
}
