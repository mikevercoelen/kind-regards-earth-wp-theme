import React from 'react'
import PropTypes from 'prop-types'
import styles from './Inner.scss'
import Content from 'components/Content/Content'
import ContinueReading from '../ContinueReading/ContinueReading'
import 'dropcap.js'
// import IconComments from 'components/IconComments/IconComments'

export default class Inner extends React.Component {
  static propTypes = {
    article: PropTypes.object
  }

  componentDidMount () {
    const dropcaps = document.querySelectorAll('.dropcap')
    window.Dropcap.layout(dropcaps, 4)
  }

  get commentsButton () {
    return null

    // return (
    //   <div className={styles.btnCommentsWrap}>
    //     <button className={styles.btnComments}>
    //       <IconComments className={styles.btnCommentsIcon} />
    //       <div className={styles.btnCommentsLabel}>
    //         13 comments
    //       </div>
    //     </button>
    //   </div>
    // )
  }

  render () {
    const { article } = this.props

    return (
      <div id='inner' className={styles.component}>
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
        <ContinueReading />
      </div>
    )
  }
}
