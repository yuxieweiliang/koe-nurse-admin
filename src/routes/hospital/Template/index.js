import React from 'react';
import { connect } from 'dva';
import {
  Icon,
  Table,
  Form,
  Switch,
  Row,
  Col,
  Divider,
  Button,
  Modal,
  Input,
  Select,
  Popconfirm,
  message
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;



class RolePage extends React.Component {
  state = {
    loading: true,
    visible: false,
    edit: {}
  };

  handleToggle = (prop) => {
    this.setState({ loading: false });
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'template/getAllTemplate',
      hospitalId: '1001'
    })
  }
  // 隐藏 loading
  componentWillReceiveProps(nextPreps) {
    if(nextPreps.templateKey) {
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
    const { templateKey } = this.props
    let data = templateKey.map((item, index) => {
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
      width: 200,
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
              <a href="javascript:;"
                 onClick={() => this.addNewTable()}
                 className="ant-dropdown-link">
                添加表格
            </a>
              <Divider type="vertical" />
              <a href="javascript:;"
                 onClick={() => this.addNewRow()}
                 className="ant-dropdown-link">
                修改
                <Icon type="down" />
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
     type: 'template/deleteTemplate',
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

  addNewRow() {
    this.setState({
      visible: true,
    });
  }
  addNewTable() {
    this.setState({
      tableVisible: true,
    });
  }
  editRow(text, record) {
    this.setState({
      visible: true,
    });
  }
  createTableBody() {
    const { templateList } = this.props
    let data = null
    if(templateList) {
      data = templateList.map((item, key) => {
        let _item = {
          key,
          ...item,
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
          type: 'template/putTemplate',
          hospitalId: '1001',
          doctor: data
        })
      }

      // 新增
      this.props.dispatch({
        type: 'template/postTemplate',
        hospitalId: '1001',
        doctor: data
      })
    });

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
  handleTableOk = (e) => {
    this.setState({
      tableVisible: false,
    });
  }
  handleTableCancel = (e) => {
    console.log(e);
    this.setState({
      tableVisible: false,
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
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
    const tableHeader = this.createTableHeader()
    const tableBody = this.createTableBody()
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

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

            <Form.Item label="报表名称" {...formItemLayout}>
              {getFieldDecorator('TemplateName', {
                rules: [{ required: true, message: 'please enter user name' }],
              })(
                <Input
                  placeholder="please "
                  onChange={(e) => this.editDoctorMessageItem(e, 'TemplateName')}
                />
              )}
            </Form.Item>
            <Form.Item label="报表类型" {...formItemLayout}>
              {getFieldDecorator('TemplateType', {
                rules: [{ required: true, message: '请选择报表类型' }],
              })(
                <Select
                  placeholder="请选择报表类型"
                  onChange={(e) => this.editDoctorMessageItem(e, 'TemplateType')}
                >
                  <Option value="one">电话随访</Option>
                  <Option value="two">健康日报</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="模版ID" {...formItemLayout}>
              {getFieldDecorator('TemplateID', {
                rules: [{ required: true, message: 'please enter user name' }],
              })(
                <Input
                  placeholder="please "
                  onChange={(e) => this.editDoctorMessageItem(e, 'TemplateID')}
                />
              )}
            </Form.Item>
            <Form.Item label="状态" {...formItemLayout}>
              {getFieldDecorator('Status', {
                rules: [{ required: true, message: 'please enter user name' }],
              })(
                <Input
                  placeholder="please "
                  onChange={(e) => this.editDoctorMessageItem(e, 'Status')}
                />
              )}
            </Form.Item>
            <Form.Item label="索引" {...formItemLayout}>
              {getFieldDecorator('ShowIndex', {
                rules: [{ required: true, message: 'please enter user name' }],
              })(
                <Input
                  placeholder="please "
                  onChange={(e) => this.editDoctorMessageItem(e, 'ShowIndex')}
                />
              )}
            </Form.Item>
        </Form>
        </Modal>

       {/*   modal start   */}
        <Modal
          title="Basic Modal"
          visible={this.state.tableVisible}
          onOk={this.handleTableOk}
          onCancel={this.handleTableCancel}
        >
          <Form layout="vertical" hideRequiredMark>

            <Form.Item label="字段名称" {...formItemLayout}>
              {getFieldDecorator('ShowName', {
                rules: [{ required: true, message: 'please enter user name' }],
              })(
                <Input
                  placeholder="please "
                  onChange={(e) => this.editDoctorMessageItem(e, 'ShowName')}
                />
              )}
            </Form.Item>
            <Form.Item label="英文缩略名" {...formItemLayout}>
              {getFieldDecorator('ItemName', {
                rules: [{ required: true, message: '请选择报表类型' }],
              })(
                <Select
                  placeholder="请选择报表类型"
                  onChange={(e) => this.editDoctorMessageItem(e, 'ItemName')}
                >
                  <Option value="one">电话随访</Option>
                  <Option value="two">健康日报</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="字段类型" {...formItemLayout}>
              {getFieldDecorator('FeildType', {
                rules: [{ required: true, message: 'please enter user name' }],
              })(
                <Input
                  placeholder="please "
                  onChange={(e) => this.editDoctorMessageItem(e, 'FeildType')}
                />
              )}
            </Form.Item>
            <Form.Item label="是否保存" {...formItemLayout}>
              {getFieldDecorator('NeedSave', {
                rules: [{ required: true, message: 'please enter user name' }],
              })(
                <Input
                  placeholder="please "
                  onChange={(e) => this.editDoctorMessageItem(e, 'NeedSave')}
                />
              )}
            </Form.Item>
            <Form.Item label="索引" {...formItemLayout}>
              {getFieldDecorator('ShowIndex', {
                rules: [{ required: true, message: 'please enter user name' }],
              })(
                <Input
                  placeholder="please "
                  onChange={(e) => this.editDoctorMessageItem(e, 'ShowIndex')}
                />
              )}
            </Form.Item>
            <Form.Item label="默认值" {...formItemLayout}>
              {getFieldDecorator('DefaultValues', {
                rules: [{ required: true, message: 'please enter user name' }],
              })(
                <Input
                  placeholder="please "
                  onChange={(e) => this.editDoctorMessageItem(e, 'DefaultValues')}
                />
              )}
            </Form.Item>
            <Form.Item label="默认分数" {...formItemLayout}>
              {getFieldDecorator('DefaultScores', {
                rules: [{ required: true, message: 'please enter user name' }],
              })(
                <Input
                  placeholder="please "
                  onChange={(e) => this.editDoctorMessageItem(e, 'DefaultScores')}
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

export default connect(({ template }) => ({
  ...template,
}))(Form.create()(RolePage));
