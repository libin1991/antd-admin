import React from 'react'
import styles from './Login.less'
import {
  Form,
  Input,
  Button,
  Icon
} from 'antd'

const FormItem = Form.Item

@Form.create()
export default class Login extends React.Component {

  onSubmit = (e) => {
    e.preventDefault()
    console.log('....')
    this.props.form.validateFields({force: true},
        (err, values)=> {
          if (err) return
          console.log(values)
          this.props.history.push('/cont')
        }
      )
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <div className={styles.main}>
        <Form onSubmit={this.onSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '请输入账户名！',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="user" className={styles.prefixIcon} />}
                placeholder="username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" className={styles.prefixIcon} />}
                placeholder="password"
                type='password'
              />
            )}
          </FormItem>
          <Button size='large' type='primary' className={styles.submit} htmlType='submit'>登录</Button>
        </Form>
      </div>
    )
  }
}