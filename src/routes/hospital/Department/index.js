import React from 'react';
import { connect } from 'dva';
import { Icon, Table, Form, Switch, Row, Col, Divider, Button, Modal, Input, Select, Popconfirm, message  } from 'antd';

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
    department: {
      Dept_Code: null,
      Dept_Name: null
    }
  };
  handleToggle = (prop) => {
    this.setState({ loading: false });
  }

  UNSAFE_componentWillMount() {
    let hospitalId = this.props.hospital ? this.props.hospital.MerchantID : '1001'
    if(!hospitalId) {
      return;
    }
    this.props.dispatch({
      type: 'hospital/getAllDepartment',
      hospitalId
    })
  }
  // 隐藏 loading
  componentWillReceiveProps(nextPreps) {
    if(nextPreps.departmentList) {
      this.handleToggle()
    }
  }

  handleRowSelectionChange = (enable) => {
    this.setState({ rowSelection: enable ? {} : undefined });
  }
  createTableHeader() {
    const { departmentTableKey } = this.props

    let data =  departmentTableKey.map((item, index) => {
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
              <Divider type="vertical" />
              <Popconfirm
                title="确认删除吗?"
                onConfirm={(e) => this._confirm(e)}
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
  _confirm(e) {
    console.log(e);
    message.success('Click on Yes');
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
      num: record.Dept_Code,
      name: record.Dept_Name,
    });

    // 显示新增面板
    this.setState({
      visible: true,
      department: record
    });
  }
  // =========================================
  //                                      新建
  // =========================================
  addNewRow() {
    // 清空字段值
    this.props.form.setFieldsValue({num: null, name: null,});
    // 显示新增面板
    this.setState({
      visible: true,
      department: {}
    });
  }

  /**
   * 点击新增修改面板的 确认按钮
   * @param e
   */
  handleOk = (e) => {
    let { department } = this.state.department

    // 如果存在 MerchantID ， 则是修改
    if(department.MerchantID) {
      this.props.dispatch({
        type: 'hospital/putDepartment',
        data: department
      })
    }

    // 新增
    this.props.dispatch({
      type: 'hospital/postDepartment',
      data: department
    })

    console.log(this.state.department);

    // 取消新增面板
    /*this.setState({
     visible: false,
     });*/
  }


  // =========================================
  //                                  创建表格
  // =========================================
  createTableBody() {
    const { departmentList } = this.props
    let data = null
    if(departmentList) {
      data = departmentList.map((item, key) => {
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

  render() {
    const state = this.state;
    const { getFieldDecorator } = this.props.form;
    const tableHeader = this.createTableHeader()
    const tableBody = this.createTableBody()

    console.log('-----------', this.props)
    console.log(tableHeader)
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
        >
          <Form layout="vertical" hideRequiredMark>

            {/*  科室名称  */}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="科室名称" >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'please enter user name' }],
                })(<Input
                  onChange={(e) => this.setState({
                    department: {
                      ...this.state.department,
                      MerchantID: e.target.value
                    }
                  })} placeholder="please enter user name" />)}
              </Form.Item>
            </Col>
          </Row>
            {/*   科室编号   */}
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="科室编号">
                  {getFieldDecorator('num', {
                    rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input
                    onChange={(e) => this.setState({
                      department: {
                        ...this.state.department,
                        Dept_Code: e.target.value
                      }
                    })} placeholder="please enter user name" />)}
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
