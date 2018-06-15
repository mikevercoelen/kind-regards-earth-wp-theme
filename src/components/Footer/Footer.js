import React from 'react'
import styles from './Footer.scss'
import Content from '../Content/Content'
import { Link, NavLink } from 'react-router-dom'
import { getAssetPath } from 'utils/template'
import { getPageRoute } from 'utils/routes'

const links = [{
  label: 'Home',
  to: '/'
}, {
  label: 'About',
  to: getPageRoute('about')
}]

const Footer = () => (
  <div className={styles.component}>
    <Content className={styles.content}>
      <Link to='/'>
        <img
          src={getAssetPath('public/images/logo-dark.svg')}
          width={171}
          height={47}
          className={styles.logo} />
      </Link>
      <div className={styles.nav}>
        {links.map((link, index) => (
          <NavLink
            exact
            key={index}
            to={link.to}
            activeClassName={styles.navLinkActive}
            className={styles.navLink}>
            {link.label}
          </NavLink>
        ))}
        <a
          href='mailto:kindregardsearth@gmail.com'
          className={styles.navLink}>
          Contact
        </a>
      </div>
    </Content>
  </div>
)

export default Footer
