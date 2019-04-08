// import React from 'react'
import dynamic from 'dva/dynamic'
import { getMenuData } from './menu'

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  // add routerData prop
  // component: () => {
  //   const p = component();
  //   return new Promise((resolve, reject) => {
  //     p.then((Comp) => {
  //       resolve(props => <Comp {...props} routerData={getRouterData(app)} />);
  //     }).catch(err => reject(err));
  //   });
  // },
  component
});

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = item.name;
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = item.name;
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerData = {
    '/user': {
      component: dynamicWrapper(app, [], ()=>import('../layouts/UserLayout'))
    },
    '/user/login': {
      component: dynamicWrapper(app, [], ()=>import('../routes/User/Login'))
    },
    '/cont': {
      component: dynamicWrapper(app, [], ()=>import('../layouts/BasicLayout'))
    },
    '/cont/dashborad': {
      component: dynamicWrapper(app, [], ()=>import('../routes/Dashborad'))
    }
  }
  const routerDataWithName  = {}
  const menuData = getFlatMenuData(getMenuData());
  Object.keys(routerData).forEach(item=> {
    routerDataWithName[item] = {
      ...routerData[item],
      name: routerData[item].name || menuData[item.replace(/^\//, '')],
    }
  })
  return routerDataWithName
}