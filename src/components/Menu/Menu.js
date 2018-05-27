import React from 'react'
import PropTypes from 'prop-types'
import styles from './Menu.scss'
import Content from '../Content/Content'
import Blanket from '../Blanket/Blanket'
import FadeDown from '../Transitions/FadeDown/FadeDown'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { getPageRoute } from 'utils/routes'

const menuItems = [{
  label: 'Home',
  to: '/'
}, {
  label: 'About',
  to: getPageRoute('about')
}]

const bodyElement = document.body

export default class Menu extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool
  }

  componentWillReceiveProps (nextProps) {
    const hasOpened = !this.props.isVisible && nextProps.isVisible
    const hasClosed = !hasOpened

    if (hasOpened) {
      bodyElement.classList.add(styles.bodyMenuOpen)
    } else if (hasClosed) {
      bodyElement.classList.remove(styles.bodyMenuOpen)
    }
  }

  render () {
    const { isVisible } = this.props

    return (
      <div
        className={cx(styles.component, {
          [styles.isVisible]: isVisible
        })}>
        <FadeDown in={isVisible}>
          <div className={styles.inner}>
            <Content className={styles.menuItems}>
              <Blanket delay={0.6}>
                {menuItems.map((item, index) => (
                  <Link key={index} to={item.to} className={styles.menuItem}>
                    {item.label}
                  </Link>
                ))}
                <a href='mailto:veerleuhlenbusch@gmail.com' className={styles.menuItem}>
                  Contact
                </a>
              </Blanket>
            </Content>
          </div>
        </FadeDown>
      </div>
    )
  }
}
