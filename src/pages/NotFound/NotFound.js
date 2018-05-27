import React from 'react'
import styles from './NotFound.scss'
import Button from 'components/Button/Button'
import { Link } from 'react-router-dom'
import BodyClassName from 'react-body-classname'
import IconNext from 'components/IconNext/IconNext'
import { getAssetPath } from 'utils/template'

const NotFound = () => (
  <div className={styles.component}>
    <BodyClassName className={styles.body} />
    <div>
      <div
        style={{
          backgroundImage: `url(${getAssetPath('public/images/404@2x.png')})`
        }}
        className={styles.bgImg} />
      <h1 className={styles.title}>
        Oeps, page not found
      </h1>
      <Link to='/'>
        <Button alt>
          <IconNext className={styles.btnBackIcon} />
          Go back home
        </Button>
      </Link>
    </div>
  </div>
)

export default NotFound
