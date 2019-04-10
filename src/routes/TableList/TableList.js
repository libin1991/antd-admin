import React from 'react'
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Button
} from 'antd'

const FormItem = Form.Item
@Form.create()
class TableList extends React.Component {

  renderForm = ()=> {
    const { getFieldDecorator  } = this.props.form
    return(
      <Form layout='inline'>
        <Row gutter={10}>
          <Col md={7} sm={10}>
            <FormItem label='订单编号'>
              {getFieldDecorator('orderId')(
                <Input placeholder='订单编号' />
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={10}>
            <FormItem>
              <Button type='primary'>确认</Button>
              <Button style={{marginLeft: 10}}>重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }

  render(){
    return (
      <Card>
        <div>
          {this.renderForm()}
        </div>
      </Card>
    )
  }
}

export default TableList