import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import styles from './style.less'

const FormItem = Form.Item

const Login = (option) => {
  const {
    dispatch,
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
    },
  } = option

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }

      if(!values.username || !values.password) {
        console.log("用户名或密码不正确！")
        return false
      }
      console.log(values)
      dispatch({ type: 'app/login', payload: values })
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src={require('../../assets/yay.jpg')} />
        <span>fdsafdsafdsa</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <Row>
          <Button type="primary" onClick={handleOk} >{/* loading={loading.effects.login} */}
          Sign in
          </Button>
          <p>
            <span>Username：guest</span>
            <span>Password：guest</span>
          </p>
        </Row>

      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({app}) => {
  console.log(app)
  return ({
    ...app
  })
})(Form.create()(Login))
