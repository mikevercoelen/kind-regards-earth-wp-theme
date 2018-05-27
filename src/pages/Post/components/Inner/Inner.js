import React from 'react'
import PropTypes from 'prop-types'
import styles from './Inner.scss'
import Content from 'components/Content/Content'
import ContinueReading from '../ContinueReading/ContinueReading'
import 'dropcap.js'
import IconComments from 'components/IconComments/IconComments'
import Disqus from 'disqus-react'
import { DISQUS_SHORT_NAME } from 'config'
import DocumentMeta from 'react-document-meta'
import he from 'he'
import stripTags from 'striptags'

export default class Inner extends React.Component {
  static propTypes = {
    article: PropTypes.object
  }

  state = {
    showComments: false
  }

  componentDidMount () {
    const dropcaps = document.querySelectorAll('.dropcap')
    window.Dropcap.layout(dropcaps, 4)
  }

  showComments = () => {
    this.setState({
      showComments: true
    })
  }

  get commentsButton () {
    const { showComments } = this.state
    const { article } = this.props

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

  render () {
    const { article } = this.props

    const meta = {
      title: he.decode(`${article.title} – ${WPSettings.meta.title}`),
      description: he.decode(stripTags(article.description)),
      canonical: article.link
    }

    return (
      <article id='inner' className={styles.component}>
        <DocumentMeta meta={meta} />
        <Content className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.date}>
              {article.date}
            </div>
            <h1 className={styles.title}>
              {article.title}
            </h1>
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
        <ContinueReading article={article} />
      </article>
    )
  }
}
