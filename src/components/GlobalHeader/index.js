import React, { Component } from 'react'
import {
  Layout,
  Icon,
  Avatar,
  Dropdown,
  Menu
} from 'antd'
import styles from './index.less'
import { connect } from 'dva'

const MenuItem = Menu.Item
const { Header } = Layout

@connect()
class GlobalHeader extends Component {

  changeCollapsed = () => {
    const { collapsed } = this.props
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed
    })
  }

  logout = ()=> {
    this.props.dispatch({
      type: 'login/logout'
    })
  }

  render() {
    const menu = (
      <Menu>
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
        <Menu.Divider />
        <MenuItem>
          <div onClick={this.logout}> <Icon type="logout" />  退出登录</div>
        </MenuItem>
      </Menu>
    )
    return (
      <Header style={{ background: '#fff', padding: 0 }} >
        <Icon
          className={styles.trigger}
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.changeCollapsed}
        />
        <ul className={styles.rightMenu}>
          <Dropdown overlay={menu}>
            <li className={styles.menuItem}>
              <Avatar icon='user' />
              <span className={styles.username}>Chechengyi</span>
            </li>
          </Dropdown>
        </ul>
      </Header>
    )
  }
}

export default GlobalHeader