
const menuData = [
  {
    name:'首页',
    icon: 'usergroup-add',
    path: 'cont/dashborad'
  },
  {
    name: '列表一',
    icon: 'usergroup-add',
    path: 'cont/list',
    children: [
      {
        name: '选项一',
        path: 'one'
      },
      {
        name: '选项二',
        path: 'two'
      }
    ]
  }
]

function formatter(data, parentPath=''){
  const list = []
  data.forEach( item=> {
    if(item.children){
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
        children: formatter(item.children, `${parentPath}${item.path}/`)
      })
    } else {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
      });
    }
  })

  return list
}

export const getMenuData = ()=>formatter(menuData)