import React, { Component } from 'react'
import { 
  Layout,
  Icon
} from 'antd'
import styles from './index.less'
import { connect } from 'dva'


const { Header } = Layout

@connect()
class GlobalHeader extends Component {

  changeCollapsed = ()=> {
    const {collapsed} = this.props
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed
    })
  }

  render(){
    return (
      <Header style={{ background: '#fff', padding: 0 }} >
        <Icon 
          className={styles.trigger} 
          type={this.props.collapsed?'menu-unfold':'menu-fold'}
          onClick={this.changeCollapsed}
        />
      </Header>
    )
  }
}

// function GlobalHeader () {
//   return (
//     <div>
//       dddd
//     </div>
//   )
// }

export default GlobalHeader