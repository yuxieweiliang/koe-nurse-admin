import React from 'react';
import { Form, Modal, Input, Select  } from 'antd';


const { Option } = Select;


class UserMessage extends React.Component {
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
      this.props.onOk({
        ...this.props.defaultValue,
        ...this.state.edit
      })
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
        title="添加用户基本信息"
        visible={visible}
        onOk={this.onOk.bind(this)}
        onCancel={onCancel}
        bodyStyle={{height: 360, overflowY: 'auto'}}
      >
        <Form layout="vertical" hideRequiredMark>
          {/*  姓名  */}
          <Form.Item label="姓名" {...formItemLayout}>
            {getFieldDecorator('UserName', {
              rules: [{ required: true, message: 'please enter user name' }],
            })(<Input
              placeholder="please enter user name"
              onChange={(e) => this.editDoctorMessageItem(e, 'UserName')}
            />)}
          </Form.Item>

          <Form.Item label="身份证" {...formItemLayout}>
            {getFieldDecorator('IDCard', {
              rules: [{ required: true, message: 'please enter url' }],
            })(<Input
              placeholder="please enter user name"
              onChange={(e) => this.editDoctorMessageItem(e, 'IDCard')}
            />)}
          </Form.Item>
          <Form.Item label="年龄" {...formItemLayout}>
            {getFieldDecorator('Age', {
              rules: [{ required: true, message: 'please enter url' }],
            })(<Input
              placeholder="please enter user name"
              onChange={(e) => this.editDoctorMessageItem(e, 'Age')}
            />)}
          </Form.Item>

          <Form.Item label="性别" {...formItemLayout}>
            {getFieldDecorator('Sex', {
              rules: [{ required: true, message: '性别' }],
            })(
              <Select
                placeholder="Please select an owner"
                onChange={(e) => this.editDoctorMessageItem(e, 'Sex')}
              >
                <Option value="man">男</Option>
                <Option value="woman">女</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="身高" {...formItemLayout}>
            {getFieldDecorator('height', {
              rules: [{ required: true, message: 'please enter url' }],
            })(<Input
              placeholder="please enter user name"
              onChange={(e) => this.editDoctorMessageItem(e, 'height')}
            />)}
          </Form.Item>
          <Form.Item label="体重" {...formItemLayout}>
            {getFieldDecorator('weight', {
              rules: [{ required: true, message: 'Please select an owner' }],
            })(<Input
              placeholder="please enter user name"
              onChange={(e) => this.editDoctorMessageItem(e, 'weight')}
            />)}
          </Form.Item>
          <Form.Item label="电话" {...formItemLayout}>
            {getFieldDecorator('telephone', {
              rules: [{ required: true, message: 'please enter url' }],
            })(<Input
              placeholder="please enter user name"
              onChange={(e) => this.editDoctorMessageItem(e, 'telephone')}
            />)}
          </Form.Item>
          <Form.Item label="医院"  {...formItemLayout}>
            {getFieldDecorator('MerchantName', {
              rules: [{ required: true, message: '医院' }],
            })(<Input
              placeholder="please enter user name"
              onChange={(e) => this.editDoctorMessageItem(e, 'MerchantName')}
            />)}
          </Form.Item>
          <Form.Item label="疾病" {...formItemLayout}>
            {getFieldDecorator('Illness_Name', {
              rules: [{ required: true, message: 'please enter url' }],
            })(<Input
              placeholder="please enter user name"
              onChange={(e) => this.editDoctorMessageItem(e, 'Illness_Name')}
            />)}
          </Form.Item>

        </Form>
      </Modal>
    )
  }
}

export default Form.create({
  mapPropsToFields(props) {
    let fromField = {}
    if(props.defaultValue) {
      for (let key in props.defaultValue) {
        fromField[key] = Form.createFormField({
          value: props.defaultValue[key],
        })
      }
    }
    return fromField;
  }
})(UserMessage);


