import React from 'react'
import {
  Layout
} from 'antd';
import GlobalHeader from '../components/GlobalHeader'
import { connect } from 'dva'
import { getRoutes } from '../utils/utils'
import { getMenuData } from '../common/menu'
import { Route, Redirect, Switch } from 'dva/router'
import SideMenu from '../components/SideMenu'

const {
 Content, Footer
} = Layout;

/* 获取菜单重定向地址 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

@connect( state => ({
  collapsed: state.global.collapsed
}))
class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  render() {
    const { collapsed, routerData, match } = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu 
          collapsed={collapsed}
          menuData={getMenuData()}
          history={this.props.history}
          location={this.props.location}
        />
        <Layout>
          <GlobalHeader collapsed={this.props.collapsed} />
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ minHeight: 'calc(100vh - 260px)', minWidth: '900px' }}>
              <Switch>
                {/* <Redirect exact form='/cont' to='/cont/dashborad' /> */}
                {
                  redirectData.map(item =>
                    <Redirect key={item.from} exact from={item.from} to={item.to} />
                  )
                }
                <Route exact path='/cont' render={()=>(
                  <Redirect to='/cont/dashborad' />
                )} />
                {
                  getRoutes(match.path, routerData).map(item=>(
                    <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                  ))
                }
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design 中后台管理系统 ©2019 Created by Chechengyi
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

// ReactDOM.render(<SiderDemo />, mountNode);

export default SiderDemo