import React from 'react';
import { connect } from 'dva';
import { Icon, Table, Form, Switch, Row, Col, Divider, Button,  Popconfirm, message, Menu, Dropdown  } from 'antd';
import RegisterModel from './Register'
import UserMessageModel from './UserMessage'
import { createTableBody } from '../../../utils'

const FormItem = Form.Item;

class RolePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      registerModel: false,
      userMessageModel: false,
      visiblePopover: false,
      // 注册信息
      register: {},
    };
  }

  /**
   * 获取用户列表
   * @constructor
   */
  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'user/getAllUser'
    })
  }
  // 隐藏 loading
  componentWillReceiveProps(nextPreps) {
    if(nextPreps.allUser) {
      this.setState({ loading: false });
    }
  }

  /**
   * 显示筛选
   * @param enable
   */
  handleRowSelectionChange = (enable) => {

    this.setState({ rowSelection: enable ? {} : undefined });
  }

   /**
   * 创建表格 { Header }
   * @param userTableKey
   */
  createTableHeader(userTableKey) {
    let data = [...userTableKey]
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Popconfirm
            title="确认删除吗?"
            onConfirm={(e) => this._confirm(e)}
            onCancel={(e) => message.error('Click on No')}
            okText="确定"
            cancelText="取消"
          >
            <a href="#" onClick={(e) => e.stopPropagation()}>删除</a>
          </Popconfirm>
        </Menu.Item>
        <Menu.Item key="1">禁用</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">认证</Menu.Item>
      </Menu>
    );

    data.push({
      title: '操作',
      key: 'action',
      width: 120,
      fixed : 'right',
      render: (text, record) => (
        <span>
              <a href="javascript:;">
                <span onClick={() => this.editRow(text, record)}>
                  修改
                </span>
              </a>
              <Divider type="vertical" />
              <Dropdown overlay={menu} trigger={['click']} >
                <a href="javascript:;" className="ant-dropdown-link">
                  <span>更多</span>
                  <Icon type="down" />
                </a>
              </Dropdown>
          </span>
      ),
    })
    return data
  }

  // =========================================
  //                                  删除一行
  // =========================================
  // 确定删除
  _confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }


  // =========================================
  //             显示修改用户信息    { model }
  // =========================================
  editRow(text, record) {
    // 显示新增面板
    this.setState({
      userMessageModel: true,
      userMessageDefault: record
    });
  }

  // =========================================
  //                     显示注册    { model }
  // =========================================
  addNewRow() {
    // 显示新增面板
    this.setState({
      registerModel: true,
      register: {}
    });
  }

  // =========================================
  //           点击按钮    注册面板    { btn }
  // =========================================
  // 确定
  registerOnOk = (register) => {

    // 新增
    this.props.dispatch({
      type: 'user/register',
      data: register
    })
    // 取消注册
    this.registerOnCancel()
  }
  // 取消注册
  registerOnCancel = () => (
    this.setState({ registerModel: false })
  )

  // =========================================
  //     点击按钮   添加修改人物信息   { btn }
  // =========================================
  // 确定
  userMessageOnOk = (data) => {
    let type = `user/${data.MerchantID ? 'put' : 'post'}UserMessage`

    this.props.dispatch({ type, data })
    // 取消修改人物信息
    this.userMessageOnCancel()
  }
  // 修改人物信息
  userMessageOnCancel = () => (
    this.setState({ userMessageModel: false })
  )

  render() {
    const state = this.state;
    const tableHeader = this.createTableHeader(this.props.userTableKey)
    const tableBody = createTableBody(this.props.allUser)
    const userMessageFormItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 }, };
    const registerFormItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 }, };

    return (
      <div style={{height: '100%'}}>

        {
          /**
           * 表头
           */
        }
        <Form layout="inline" style={{padding: '0 15px'}}>
          <Row type="flex" align="middle">
            <Col span="12">
              <FormItem label="Checkbox">
                <Switch
                  checked={!!state.rowSelection}
                  onChange={this.handleRowSelectionChange.bind(this)}
                />
              </FormItem>
            </Col>
            <Col span="12" style={{textAlign: 'right'}}>
              <Button  onClick={() => this.addNewRow()}>
                添加
              </Button>
            </Col>
          </Row>
        </Form>

        {
          /**
           * 表格
           * size 表格大小
           * bordered 显示边框
           * pagination 不显示分页
           * loading 是否再 loading
           * columns 配置表格头部列
           * dataSource 表格数据
           * scroll 表格宽高
           */
        }
        <Table
          size="small"
          bordered={true}
          pagination={false}
          loading={state.loading}
          columns={tableHeader}
          dataSource={tableBody}
          scroll={{ x: 1300, y: 'calc(100vh - 182px)' }}
        />

       {
         /**
          * 注册
          * visible 显示隐藏
          * formItemLayout 标题与输入框的比例
          * onOk 点击确定 { callback }
          * onCancel 点击取消 { callback }
          */
       }
        <RegisterModel
          visible={this.state.registerModel}
          formItemLayout={registerFormItemLayout}
          onOk={this.registerOnOk.bind(this)}
          onCancel={this.registerOnCancel}
        />

        {
          /**
           * 添加 修改 用户信息
           * visible 显示隐藏
           * formItemLayout 标题与输入框的比例
           * onOk 点击确定 { callback }
           * onCancel 点击取消 { callback }
           */
        }
        <UserMessageModel
          visible={this.state.userMessageModel}
          defaultValue={this.state.userMessageDefault}
          formItemLayout={userMessageFormItemLayout}
          onOk={this.userMessageOnOk.bind(this)}
          onCancel={this.userMessageOnCancel}
        />


      </div>
    )
  }
}




RolePage.propTypes = {
};

export default connect(({ user }) => ({
  ...user,
}))(RolePage);
