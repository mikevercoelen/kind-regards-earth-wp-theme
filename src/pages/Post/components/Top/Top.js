import React from 'react'
import styles from './Top.scss'
import ScrollDown from 'components/ScrollDown/ScrollDown'
// import PropTypes from 'prop-types'

const getId = () => {
  return (+new Date()).toString()
}

export default class Top extends React.Component {
  static propTypes = {
    // article: PropTypes.object
  }

  id = null
  player = null

  constructor (props) {
    super(props)
    this.id = getId()
  }

  handleClick = () => {
    const isPlaying = this.player.getPlayerState() === 1

    if (isPlaying) {
      this.player.pauseVideo()
    } else {
      this.player.playVideo()
    }
  }

  componentDidUpdate () {
    this.initializePlayer(this.props)
  }

  initializePlayer ({ article }) {
    setTimeout(() => {
      this.player = new window.YT.Player(this.id, {
        videoId: article.youtubeId,
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
        // events: {
        //   onStateChange: (e) => {
        //     const isPlaying = e.target.getPlayerState() === 1
        //
        //     if (isPlaying) {
        //       this.props.onReady()
        //     }
        //   }
        // }
      })
    })
  }

  componentWillUnmount () {
    this.player.destroy()
  }

  componentDidMount () {
    this.initializePlayer(this.props)
  }

  render () {
    return (
      <div className={styles.component} onClick={this.handleClick}>
        <div className={styles.videoContainer}>
          <div className={styles.videoBg}>
            <div className={styles.videoFg}>
              <div id={this.id} />
            </div>
          </div>
        </div>
        <ScrollDown
          label='Start reading'
          to='#inner' />
      </div>
    )
  }
}
