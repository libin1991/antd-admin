/* 侧边菜单 */

import React from 'react'
import { Menu, Layout, Icon } from 'antd'


const SubMenu = Menu.SubMenu;
const { Sider } = Layout

class SideMenu extends React.Component {

  menuItemClick =(path)=> {
    path = '/' + path
    if (path === this.props.location.pathname) return
    this.props.history.push(path)
  }

  getSelectedMenuKeys = (path) => {
    const flatMenuKeys = this.getFlatMenuKeys(this.props.menuData);
    if (flatMenuKeys.indexOf(path.replace(/^\//, '')) > -1) {
      return [path.replace(/^\//, '')];
    }
    if (flatMenuKeys.indexOf(path.replace(/^\//, '').replace(/\/$/, '')) > -1) {
      return [path.replace(/^\//, '').replace(/\/$/, '')];
    }
    return flatMenuKeys.filter((item) => {
      const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
      const itemRegExp = new RegExp(itemRegExpStr);
      return itemRegExp.test(path.replace(/^\//, ''));
    });
  }

  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach((item) => {
      if (item.children) {
        keys.push(item.path);
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      } else {
        keys.push(item.path);
      }
    });
    return keys;
  }

  getNavMenuItems = ()=> {
    const { menuData } = this.props
    if ( !menuData ) {
      return []
    }
    return menuData.map( item=> {
      if (!item.name) return null
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={<span><Icon type={item.icon} /> <span>{item.name}</span></span>}
          >
            {
              item.children.map( childrenItem=>(
                <Menu.Item key={childrenItem.path} onClick={()=>this.menuItemClick(childrenItem.path)}>{childrenItem.name}</Menu.Item>
              ))
            }
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.path} onClick={()=>this.menuItemClick(item.path)}><Icon type={item.icon} /> <span>{item.name}</span></Menu.Item>
        )
      }
    })
  }

  render(){
    const { location } = this.props
    return (
      <Sider
        trigger={null}
        collapsed={this.props.collapsed}
      >
        <Menu 
          theme="dark" 
          selectedKeys={this.getSelectedMenuKeys(location.pathname)}
          mode="inline"
        >
          {this.getNavMenuItems()}    
        </Menu>
      </Sider>
    )
  }
}

export default SideMenu