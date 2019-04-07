import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { Spin } from 'antd';
import dynamic from 'dva/dynamic';
import IndexPage from './routes/IndexPage';
import styles from './index.less';
import { getRouterData } from './common/router'

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app)
  const UserLayout = routerData['/user/login'].component
  const BasicLayout = routerData['/cont'].component
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/user/login" render={ props => <UserLayout routerData={routerData} {...props} />} />
        <Route path="/cont" render={ props=> <BasicLayout routerData={routerData} {...props} /> } />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
