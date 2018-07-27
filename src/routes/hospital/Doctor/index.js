import React from 'react';
import { connect } from 'dva';
import { Icon, Table, Form, Switch, Row, Col, Divider, Button, Modal, Input, Select, Popconfirm, message  } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class RolePage extends React.Component {
  state = {
    loading: true,
    visible: false,
    // 添加或编辑用户时，暂存信息
    edit: {}
  };
  handleToggle = () => {

    this.setState({ loading: false });
  }

  UNSAFE_componentWillMount() {

    this.props.dispatch({
      type: 'hospital/getAllDoctor',
      hospitalId: '1001'
    })
  }
  // 隐藏 loading
  componentWillReceiveProps(nextPreps) {
    if(nextPreps.doctorList) {
      this.handleToggle()
    }
  }

  handleRowSelectionChange = (enable) => {
    this.setState({ rowSelection: enable ? {} : undefined });
  }
  tableKey = []
  createTableHeader() {
    const { doctorTableKey } = this.props

    let data =  doctorTableKey.map((item, index) => {
      this.tableKey.push(item.key)
      let _item = {
        title: item.title,
        dataIndex: item.key,
        key: item.key,
        width: item.width,
      }
      if(item.key === 'Dept_Code') {
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
              <Popconfirm
                title="确认删除吗?"
                onConfirm={() => this._confirm(text, record)}
                onCancel={(e) => this._cancel(e)}
                okText="确定"
                cancelText="取消"
              >
                <a href="javascript:;">删除</a>
              </Popconfirm>
              <Divider type="vertical" />
              <a href="javascript:;" className="ant-dropdown-link" onClick={() => this.editRow(text, record)}>修改<Icon type="down" />
            </a>
          </span>
      ),
    })
    return data
  }

  // =========================================
  //                                  删除一行
  // =========================================
  /**
   * 确定删除
   */
  _confirm(text, record) {
    console.log(text, record);
    message.success('Click on Yes');

    /*this.props.dispatch({
      type: 'hospital/deleteDoctor',
      data: record.UserID
    })*/

  }
  /**
   * 取消删除
   */
  _cancel(e) {
    console.log(e);
    message.error('Click on No');
  }


  // =========================================
  //                                      修改
  // =========================================
  editRow(text, record) {
    // 为名称赋值
    this.props.form.setFieldsValue({
      UserID: record.UserID,
      UserName: record.UserName,
      Age: record.Age,
      Sex: record.Sex,
      MinZu: record.MinZu,
      Weight: record.Weight,
      IDCard: record.IDCard,
      Telephone: record.Telephone,
      Illness_Name: record.Illness_Name,
    });

    // 显示新增面板 tableKey
    this.setState({
      visible: true,
      edit: record
    });
  }
  // =========================================
  //                                      新建
  // =========================================
  addNewRow() {
    const { doctorTableKey } = this.props
    const AllKey = {}
    doctorTableKey.forEach(function(item) {
      if(item.key === 'Sex') {
        AllKey[item.key] = 'man'
      } else {
        AllKey[item.key] = null
      }
    })

    // 清空字段值
    this.props.form.setFieldsValue(AllKey);
    // 显示新增面板
    this.setState({
      visible: true,
      edit: {}
    });
  }

  /**
   * 点击新增修改面板的 确认按钮
   * @param e
   */
  handleOk = (e) => {
    let { edit } = this.state

    // 验证所有输入框
    this.props.form.validateFields((err, values) => {
      // Age IDCard Illness_Name MinZu Telephone UserID UserName Weight
      let data = {
        "UserID": "445348716989471",
        "UserName": "",
        "Age": 24,
        "Sex": "",
        "MinZu": "",
        "Weight": "",
        "IDCard": "610111121252253258",
        "Telephone": "",
        "Illness_Name": "天然呆",
        "VShardID": 1001,
        "MerchantID": 1001,
        "IsDeleted": false,
        "UserType": "医生",
        "MerchantName": "陕西省中医医院",
        ...edit
      }
      if (err) {
        console.log('err: ', err, values);
        return;
      }

      message.success('待添加');
      return;


      // 如果存在 MerchantID ， 则是修改
      if(edit.MerchantID) {
        this.props.dispatch({
          type: 'hospital/putDoctor',
          hospitalId: '1001',
          doctor: data
        })
      }

      // 新增
      this.props.dispatch({
        type: 'hospital/postDoctor',
        hospitalId: '1001',
        doctor: data
      })
    });


    // 取消新增面板
    /*this.setState({
     visible: false,
     });*/
  }


  // =========================================
  //                                  创建表格
  // =========================================
  createTableBody() {
    const { doctorList } = this.props
    let data = null
    if(doctorList) {
      data = doctorList.map((item, key) => ({
        key,
        ...item,
      }))
    }
    return data
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

  queryDoctor() {
    message.success('待添加');
   /* this.props.dispatch({
      type: 'user/getUser',
      userId: '445348716989471'
    })*/
  }

  render() {
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
    const tableHeader = this.createTableHeader()
    const tableBody = this.createTableBody()
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };
    const formItemMd = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const formItemSm = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    };

    console.log(this.props.doctorList)

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
              <Button  onClick={() => this.addNewRow()}>添加</Button>
              <Button  onClick={() => this.queryDoctor()}>搜索</Button>
            </Col>
          </Row>

        </Form>
        <Table {...this.state} columns={tableHeader} dataSource={tableBody} scroll={{ x: 1300, y: 'calc(100vh - 182px)' }} bordered={true} />


        {/*   modal start   */}
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={() => this.setState({visible: false})}
          bodyStyle={{height: 360, overflowY: 'auto'}}
        >
          <Form layout="vertical" hideRequiredMark>
            <Form.Item label="用户ID" {...formItemLayout}>
              {getFieldDecorator('UserID', {
                rules: [{ required: true, message: 'please enter url' }],
              })(
                <Input
                  placeholder="please enter url"
                  onChange={(e) => this.editDoctorMessageItem(e, 'UserID')}
                />
              )}
            </Form.Item>
            <Row gutter={16}>
              <Col span={14}>
                {/*  姓名  */}
                <Form.Item label="姓名" {...formItemMd}>
                  {getFieldDecorator('UserName', {
                    rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input
                    placeholder="please enter user name"
                    onChange={(e) => this.editDoctorMessageItem(e, 'UserName')}
                  />)}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="年龄" {...formItemMd}>
                  {getFieldDecorator('Age', {
                    rules: [{ required: true, message: 'please enter url' }],
                  })(
                    <Input
                      placeholder="please enter url"
                      onChange={(e) => this.editDoctorMessageItem(e, 'Age')}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="性别" {...formItemSm}>
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
              </Col>
              <Col span={8}>
                <Form.Item label="民族" {...formItemSm}>
                  {getFieldDecorator('MinZu', {
                    rules: [{ required: true, message: 'please enter url' }],
                  })(
                    <Input
                      placeholder="please enter url"
                      onChange={(e) => this.editDoctorMessageItem(e, 'MinZu')}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="体重" {...formItemSm}>
                  {getFieldDecorator('Weight', {
                    rules: [{ required: true, message: 'Please select an owner' }],
                  })(
                    <Input
                      placeholder="please enter url"
                      onChange={(e) => this.editDoctorMessageItem(e, 'Weight')}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="身份证" {...formItemLayout}>
              {getFieldDecorator('IDCard', {
                rules: [{ required: true, message: 'please enter url' }],
              })(
                <Input
                  placeholder="please enter url"
                  onChange={(e) => this.editDoctorMessageItem(e, 'IDCard')}
                />
              )}
            </Form.Item>
            <Form.Item label="电话" {...formItemLayout}>
              {getFieldDecorator('Telephone', {
                rules: [{ required: true, message: 'please enter url' }],
              })(
                <Input
                  placeholder="please enter url"
                  onChange={(e) => this.editDoctorMessageItem(e, 'Telephone')}
                />
              )}
            </Form.Item>
            <Form.Item label="疾病" {...formItemLayout}>
              {getFieldDecorator('Illness_Name', {
                rules: [{ required: true, message: 'please enter url' }],
              })(
                <Input
                  placeholder="please enter url"
                  onChange={(e) => this.editDoctorMessageItem(e, 'Illness_Name')}
                />
              )}
            </Form.Item>
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
