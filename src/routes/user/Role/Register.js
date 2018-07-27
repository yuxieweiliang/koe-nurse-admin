import React from 'react';
import { Form, Modal, Input, Select  } from 'antd';


const { Option } = Select;


class Register extends React.Component {
  state = {
    // 注册信息
    edit: {},
  };

  onOk() {
    this.props.form.validateFields((err, values) => {

      if (err) {
        console.log('err: ', err, values);
        return;
      }
      // 返回表单内容
      this.props.onOk(this.state.edit)
    });
  }
  // =========================================
  //                              编辑用户信息
  // =========================================
  editDoctorMessageItem(e, key) {

    if(typeof e === 'string') {
      this.setState({
        edit: { ...this.state.edit, [key]: e }
      })
      return;
    }

    this.setState({
      edit: {
        ...this.state.edit,
        [key]: e.target.value
      }
    })
  }

  render() {
    const { visible, onCancel, formItemLayout } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (

      <Modal
        title="添加用户"
        visible={visible}
        onOk={this.onOk.bind(this)}
        onCancel={onCancel}
        bodyStyle={{height: 220, overflowY: 'auto', paddingBottom: 0}}
      >
        <Form layout="vertical" hideRequiredMark>
          {/*  姓名  */}
          <Form.Item label="用户名" {...formItemLayout}>
            {getFieldDecorator('LoginName', {
              rules: [{ required: true, message: 'please enter user name' }],
            })(<Input
              placeholder="please enter user name"
              onChange={(e) => this.editDoctorMessageItem(e, 'LoginName')}
            />)}
          </Form.Item>

          <Form.Item label="密码" {...formItemLayout}>
            {getFieldDecorator('Password', {
              rules: [{ required: true, message: 'please enter url' }],
            })(<Input
              placeholder="please enter user name"
              onChange={(e) => this.editDoctorMessageItem(e, 'Password')}
            />)}
          </Form.Item>

          <Form.Item label="类型" {...formItemLayout}>
            {getFieldDecorator('RegType', {
              rules: [{ required: true, message: 'please enter url' }],
            })(
              <Select
                placeholder="Please select an owner"
                onChange={(e) => this.editDoctorMessageItem(e, 'RegType')}
              >
                <Option value="patient">患者</Option>
                <Option value="doctor">医生</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Register);


