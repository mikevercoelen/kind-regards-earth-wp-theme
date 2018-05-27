import React from 'react'
import styles from './ArticleTop.scss'
import ScrollDown from 'components/ScrollDown/ScrollDown'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'

export default class ArticleTop extends React.Component {
  static propTypes = {
    article: PropTypes.object
  }

  player = null

  handleClick = () => {
    const { article } = this.props
    const hasYoutubeId = article.youtubeId

    if (!hasYoutubeId) {
      return
    }

    const isPlaying = this.player && this.player.getPlayerState() === 1

    if (isPlaying) {
      this.player.pauseVideo()
    } else {
      this.player.playVideo()
    }
  }

  onYTReady = event => {
    this.player = event.target
  }

  get background () {
    const { article } = this.props

    if (article.youtubeId) {
      return (
        <div
          className={styles.videoContainer}>
          <div className={styles.videoBg}>
            <YouTube
              containerClassName={styles.videoFg}
              videoId={article.youtubeId}
              opts={{
                playerVars: {
                  rel: 0,
                  controls: 0,
                  showinfo: 0,
                  loop: 1,
                  autoplay: 1,
                  enablejsapi: 1,
                  modestbranding: 1,
                  disablekb: 1,
                  cc_load_policy: 0
                }
              }}
              onReady={this.onYTReady}
            />
          </div>
        </div>
      )
    }

    const hasImage = article.img && article.img.full

    if (hasImage) {
      return (
        <div
          style={{
            backgroundImage: `url(${article.img.full.src})`
          }}
          className={styles.imageBackground} />
      )
    }

    return null
  }

  render () {
    return (
      <div
        onClick={this.handleClick}
        className={styles.component}>
        {this.background}
        <ScrollDown
          label='Start reading'
          to='#inner' />
      </div>
    )
  }
}
