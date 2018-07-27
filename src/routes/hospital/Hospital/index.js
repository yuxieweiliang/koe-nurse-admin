import React from 'react';
import { connect } from 'dva';
import { Icon, Table, Form, Switch, Row, Col, Divider, Button, Modal, Input, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;



class RolePage extends React.Component {
  state = {
    loading: true,
    pagination: false,
    size: 'small',
    rowSelection: {},
    scroll: undefined,
    visible: false,
  };

  handleToggle = (prop) => {
    this.setState({ loading: false });
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'hospital/getAllHospital'
    })
  }
  // 隐藏 loading
  componentWillReceiveProps(nextPreps) {
    if(nextPreps.hospitalList) {
      this.handleToggle()
    }
  }

  handleRowSelectionChange = (enable) => {

    this.setState({ rowSelection: enable ? {} : undefined });
  }

  changeDepartment(text, record) {
    console.log(this.props)
    // this.props.changeMneuItem()
  }

  createTableHeader() {
    const { hospitalTableKey } = this.props
    let data = hospitalTableKey.map((item, index) => {
      let _item = {
        title: item.title,
        dataIndex: item.key,
        key: item.key,
        width: item.width,
      }
      if(item.key === 'Department') {
        _item.render = (text, record) => (
          <span>
            <a href="javascript:;"  onClick={() => this.changeDepartment(text, record)}>科室列表</a>
          </span>
        )
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
              <a href="javascript:;" className="ant-dropdown-link">修改<Icon type="down" />
            </a>
          </span>
      ),
    })

    return data

  }
  deleteRow(text, record) {
    console.log(text, record)
  }
  editRow(text, record) {
    this.setState({
      visible: true,
    });
  }
  createTableBody() {
    const { hospitalList } = this.props
    let data = null
    if(hospitalList) {
      data = hospitalList.map((item, key) => {

        let _item = {
          key,
          MerchantID: item.MerchantID,
          MerchantName: item.MerchantName,
          Telephone: '',
          IsDeleted: item.IsDeleted,
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

    return (
      <div style={{height: '100%'}}>
        <Form layout="inline" style={{padding: '0 15px'}}>
          <Row type="flex" align="middle">
            <Col span="12">
              <FormItem label="Checkbox">
                <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange.bind(this)} />
              </FormItem>
            </Col>
            <Col span="12" style={{textAlign: 'right'}}>
              <Button  onClick={() => this.editRow()}>添加</Button>
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
            <Col span={24}>
              <Form.Item label="医院名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'please enter user name' }],
                })(<Input placeholder="please enter user name" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="级别">
                {getFieldDecorator('sex', {
                  rules: [{ required: true, message: '性别' }],
                })(
                  <Select placeholder="请选择医院级别">
                    <Option value="one">一甲</Option>
                    <Option value="two">二甲</Option>
                    <Option value="three">三甲</Option>
                  </Select>
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

export default connect(({ hospital }) => ({
  ...hospital,
}))(Form.create()(RolePage));
