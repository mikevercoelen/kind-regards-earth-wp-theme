import React from 'react'
import PropTypes from 'prop-types'
import styles from './HomeTop.scss'
import Content from 'components/Content/Content'
import Button from 'components/Button/Button'
import ScrollDown from 'components/ScrollDown/ScrollDown'
import { getAssetPath } from 'utils/template'
import IconNext from 'components/IconNext/IconNext'
import { connect } from 'react-redux'
import { getLatestPost } from 'selectors/entities'
import { getPostRoute } from 'utils/routes'
import { Link } from 'react-router-dom'
import { Map } from 'immutable'

const HomeTop = ({ latestPost }) => {
  let latestPostRoute = latestPost ? getPostRoute(latestPost.get('slug')) : '/'

  return (
    <div className={styles.component}>
      <div className={styles.videoOverlay} />
      <div className={styles.videoContainer}>
        <video
          playsInline
          autoPlay
          muted
          loop
          id='video-bg'
          className={styles.video}>
          <source src={getAssetPath('public/videos/bg-720.webm')} type='video/webm' />
          <source src={getAssetPath('public/videos/bg-720.mp4')} type='video/mp4' />
        </video>
      </div>
      <div className={styles.topContent}>
        <Content className={styles.content}>
          <h1 className={styles.headline}>
            <em>Memoirs</em> of <a>my</a> <em>expedition</em> around the <em>planet</em>
          </h1>
          <Link to={latestPostRoute}>
            <Button className={styles.btnReadLatest}>
              Read my latest story
              <IconNext className={styles.btnReadLatestIcon} />
            </Button>
          </Link>
        </Content>
      </div>
      <ScrollDown
        label='Articles'
        to='#articles' />
    </div>
  )
}

HomeTop.propTypes = {
  latestPost: PropTypes.instanceOf(Map)
}

const mapStateToProps = state => ({
  latestPost: getLatestPost(state)
})

export default connect(
  mapStateToProps
)(HomeTop)
