import React from 'react'
import PropTypes from 'prop-types'
import Content from '../Content/Content'
import Menu from '../Menu/Menu'
import styles from './Header.scss'
import cx from 'classnames'
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import Headroom from 'react-headroom'
import { getAssetPath } from 'utils/template'

const HEADER_SCROLL_BREAKPOINT = 100

const scrollToTop = () => window.scrollTo(0, 0)

class Header extends React.Component {
  static propTypes = {
    location: PropTypes.object
  }

  state = {
    isMenuVisible: false,
    hasScrolledDown: false
  }

  constructor (props) {
    super(props)
    this.onScroll = _.throttle(this.handleScroll, 200)
    this.onKeyDown = _.throttle(this.handleKeyDown, 200)
  }

  handleKeyDown = e => {
    const { isMenuVisible } = this.state
    const isEscape = e.keyCode === 27

    if (isMenuVisible && isEscape) {
      this.hideMenu()
    }
  }

  handleScroll = () => {
    const { hasScrolledDown } = this.state
    const scrollTop = document.documentElement.scrollTop

    if (!hasScrolledDown && scrollTop >= HEADER_SCROLL_BREAKPOINT) {
      this.setState({ hasScrolledDown: true })
    } else if (hasScrolledDown && scrollTop <= HEADER_SCROLL_BREAKPOINT) {
      this.setState({ hasScrolledDown: false })
    }
  }

  componentWillReceiveProps (nextProps) {
    const hasRouteChanged = this.props.location.pathname !== nextProps.location.pathname

    if (hasRouteChanged) {
      this.hideMenu()
      scrollToTop()
    }
  }

  hideMenu = () => {
    this.setState({
      isMenuVisible: false
    })
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll, false)
    window.addEventListener('keydown', this.onKeyDown, false)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll, false)
    window.removeEventListener('keydown', this.onKeyDown, false)
  }

  handleBtnMenuClick = () => {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible
    })
  }

  render () {
    const { isMenuVisible, hasScrolledDown } = this.state

    return [
      <Menu
        key='menu'
        isVisible={isMenuVisible} />,
      <Headroom key='header'>
        <div
          className={cx(styles.component, {
            [styles.hasScrolledDown]: hasScrolledDown,
            [styles.isMenuVisible]: isMenuVisible
          })}>
          <Content className={styles.content}>
            <Link to='/'>
              <img
                src={getAssetPath('public/images/logo-white.svg')}
                className={styles.logo} />
            </Link>
            <button
              onClick={this.handleBtnMenuClick}
              type='button'
              className={styles.btnMenu}>
              <div className={styles.btnMenuInner} />
            </button>
          </Content>
        </div>
      </Headroom>
    ]
  }
}

export default withRouter(Header)
