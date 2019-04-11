import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Row,
  Col,
  Spin
} from 'antd'
import TableHoc from '../../hoc/table'

@connect(state => ({
  list: state.goods.list,
  loading: state.goods.loading
}))
@TableHoc('goods/getData')

export default class GoodsList extends React.Component {

  componentDidMount() {
    this.props.resetData()
  }

  render() {
    return (
      <Spin spinning={this.props.loading}>
        <div style={{ minHeight: 200 }}>
          <Row gutter={25}>
            {
              this.props.list.map(item => (
                <Col span={6} style={{ marginBottom: 10 }} key={item.id}>
                  <Card>
                    <img src={item.img} alt="" style={{ width: '100%' }} />
                    <p>商品名称：{item.name}</p>
                    <p>{item.desc}</p>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </div>
      </Spin>
    )
  }
}