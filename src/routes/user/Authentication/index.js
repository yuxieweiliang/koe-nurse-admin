import React from 'react';
import { connect } from 'dva';
import { Icon, Table, Form, Switch, Row, Col, Divider, Button, Modal, Input, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;


class RolePage extends React.Component {
  state = {
    loading: false,
    pagination: false,
    size: 'small',
    rowSelection: {},
    scroll: undefined,
    visible: false,
  };
  handleToggle = (prop) => {

    console.log(prop)
    return (enable) => {
      console.log(this)
      this.setState({ [prop]: enable });
    };
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'user/getAllUser'
    })
  }

  handleRowSelectionChange = (enable) => {

    this.setState({ rowSelection: enable ? {} : undefined });
  }
  createTableHeader() {
    const { allUser } = this.props
    let data = null
    let key = [
      { title: 'ID', key: 'ID', width: 100 },
      { title: '姓名', key: 'UserName', width: 100 },
      { title: '年龄', key: 'Age', width: 60 },
      { title: '性别', key: 'Sex', width: 60 },
      { title: '电话', key: 'Telephone', width: 100 },
      { title: '医院', key: 'MerchantName', width: 180 },
      { title: '疾病', key: 'Illness_Name', width: 100 },
      { title: '身份证', key: 'IDCard' },
      { title: '身高', key: 'ShenGao', width: 60 },]
    if(allUser) {
      data = key.map((item, index) => {
        let _item = {
          title: item.title,
          dataIndex: item.key,
          key: item.key,
          width: item.width,
        }
        if(item.key === 'ID') {
          _item.fixed = 'left'
          _item.width = 100
        }
        return _item
      })

      data.push({
        title: '操作',
        key: 'action',
        width: 120,
        fixed : 'right',
        render: (text, record) => (
          <span>
            <a href="javascript:;">{record.name}</a>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={() => this.deleteRow(text, record)}>删除</a>
              <Divider type="vertical" />
              <a href="javascript:;" className="ant-dropdown-link" onClick={() => this.editRow(text, record)}>修改<Icon type="down" />
            </a>
          </span>
        ),
      })

    }

    return data

  }
  deleteRow(text, record) {
    console.log(text, record)
  }
  editRow(text, record) {
    this.setState({
      visible: true,
    });
    console.log(text, record)
  }
  createTableBody() {
    const { allUser } = this.props
    let data = null
    if(allUser) {
      data = allUser.map((item, key) => {

        let _item = {
          key,
          ID: item.ID,
          IDCard: item.IDCard,
          Illness_Name: item.Illness_Name,
          MerchantName: item.MerchantName,
          Sex: item.Sex,
          ShenGao: item.ShenGao,
          Telephone: '',
          UserID: item.UserID,
          UserName: item.UserName,
        }
        if(item === 'ID') {
          _item.fixed = 'left'
        }
        return _item
      })
    }
    return data
  }


  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
    const tableHeader = this.createTableHeader()
    const tableBody = this.createTableBody()

    console.log(tableHeader)

    console.log(this.props)
    return (
      <div style={{height: '100%'}}>
        <Form layout="inline" style={{padding: '0 15px'}}>
          <Row type="flex" align="middle">
            <Col span="12">
              <FormItem label="loading">
                <Switch checked={state.loading} onChange={this.handleToggle('loading')} />
              </FormItem>
              <FormItem label="Checkbox">
                <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange.bind(this)} />
              </FormItem>
            </Col>
            <Col span="12" style={{textAlign: 'right'}}>
              <Button>Primary</Button>
            </Col>
          </Row>

        </Form>
        <Table {...this.state} columns={tableHeader} dataSource={tableBody} scroll={{ x: 1300, y: 'calc(100vh - 182px)' }} bordered={true} />


       {/*   modal start   */}
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form layout="vertical" hideRequiredMark>

            {/*  姓名  */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="姓名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'please enter user name' }],
                })(<Input placeholder="please enter user name" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="年龄">
                {getFieldDecorator('age', {
                  rules: [{ required: true, message: 'please enter url' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    placeholder="please enter url"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="性别">
                {getFieldDecorator('sex', {
                  rules: [{ required: true, message: '性别' }],
                })(
                  <Select placeholder="Please select an owner">
                    <Option value="man">男</Option>
                    <Option value="woman">女</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="身高">
                {getFieldDecorator('height', {
                  rules: [{ required: true, message: 'please enter url' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    placeholder="please enter url"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="体重">
                {getFieldDecorator('weight', {
                  rules: [{ required: true, message: 'Please select an owner' }],
                })(
                  <Select placeholder="Please select an owner">
                    <Option value="man">男</Option>
                    <Option value="woman">女</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="电话">
                {getFieldDecorator('telephone', {
                  rules: [{ required: true, message: 'please enter url' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    placeholder="please enter url"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="医院">
                {getFieldDecorator('hospital', {
                  rules: [{ required: true, message: '医院' }],
                })(
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="疾病">
                {getFieldDecorator('num', {
                  rules: [{ required: true, message: 'please enter url' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    placeholder="please enter url"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="简介">
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ],
                })(<Input.TextArea rows={4} placeholder="please enter url description" />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        </Modal>
      </div>
    )
  }
}




RolePage.propTypes = {
};

export default connect(({ user }) => ({
  ...user,
}))(Form.create()(RolePage));
