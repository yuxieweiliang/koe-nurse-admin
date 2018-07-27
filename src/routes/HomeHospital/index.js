import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { Layout, Menu, Icon, Tabs, Button } from 'antd';
import {  } from '../../utils'
import { storage, b64Decode } from '../../utils'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const TabPane = Tabs.TabPane;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;

    this.state = {
      loading: false,
      selectedKeys: ['role'],
      openKeys: ['user'],
    };
  }

  onChange = (activeKey) => {

    this.props.dispatch({
      type: 'home/changeOrAddTab',
      menuItem: activeKey
    })

    this.setState({ selectedKeys: [activeKey] })
  }

  onEdit = (targetKey, action) => {
    let { panes, dispatch } = this.props
    let pane = panes.filter(item => item.key !== targetKey)

    dispatch({ type: 'home/removeTab', menuItem: targetKey })

    this.setState({ selectedKeys: [pane[pane.length - 1].key] })
  }


  UNSAFE_componentWillMount() {
    const token = storage.getItem('system.token')

    if(token) {
      const access = token.access_token
      let start = access.indexOf('.') + 1, end = access.lastIndexOf('.')
      let str = access.substring(start, end)
      // console.log('token: ', JSON.parse(b64Decode(str)))

      // 打开 role 标签
      this.props.dispatch({
        type: 'home/changeOrAddTab',
        menuItem: 'role',
      })

      // 保存用户信息
      this.props.dispatch({
        type: 'user/setUserMsg',
        user: JSON.parse(b64Decode(str))
      })

    } else {
      this.props.dispatch({
        type: 'app/logout'
      })
    }
  }

  onOpenChange(openKeys) {
    this.setState({ openKeys })
  }
  onSelect({selectedKeys, key}) {

    this.setState({ selectedKeys })

    this.props.dispatch({
      type: 'home/changeOrAddTab',
      menuItem: key
    })
  }

  handleClickMenu = (e) => {
    console.log('click ', e);
    this.props.dispatch({
      type: 'app/logout'
    })
  }

  render() {
    const { menu, panes, activeKey } = this.props
    const { openKeys, selectedKeys } = this.state

    return (
      <Layout className={styles.Layout}>
        <Sider className={styles.sider}>
          <div className={styles.logoBox}><div className="logo" /></div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            // onClick={this.clickMenuItemToAddTab.bind(this)}
            onOpenChange={this.onOpenChange.bind(this)}
            onSelect={this.onSelect.bind(this)}
            style={{ height: '100vh - 64px', borderRight: 0 }}
          >
            {
              menu && menu.map((list, key) => {
                return (
                  <SubMenu
                    key={list.key}
                    title={<span><Icon type="user"/>{list.title}</span>}
                  >
                    {
                      list.children && list.children.map((item, i) => {
                        return(
                          <Menu.Item  key={item.key}>{item.title}</Menu.Item>
                        )
                      })
                    }
                  </SubMenu>
                )
              })
            }
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200, background: '#ccc',  height: '100%', position: 'relative' }}>
          <Header className={styles.header}
            style={{ background: '#fff', padding: '0 15px' }}>
            <div className={styles.headerLeft}>
              <Icon type="menu-unfold" />
              <Icon type="menu-fold" />
            </div>
              <div className={styles.headerRight}>
                <div className={styles.button}>
                  <Icon type="mail" />
                </div>
                <Menu mode="horizontal" onClick={this.handleClickMenu}>
                  <SubMenu
                    style={{
                      float: 'right',
                    }}
                    title={<span>
                   <Icon type="user" />
                    fdsa
            </span>}
                  >
                    <Menu.Item key="logout">
                      Sign out
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
          </Header>

          <Layout style={{ height: '100%', paddingTop: 10}}>
            <Content className={styles.cardContainer} style={{ margin: 0, minHeight: 280 }}>
              <Tabs
                onChange={this.onChange}
                activeKey={activeKey}
                type="editable-card"
                hideAdd={true}
                onEdit={this.onEdit}
              >
                {
                  panes.map(pane => {
                    return (
                      <TabPane  style={{ height: '100%'}}
                                tab={pane.title}
                                key={pane.key}
                                closable={pane.closable}>
                        {pane.content}
                      </TabPane>
                    )
                  })}
              </Tabs>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
};

export default connect((state) => {
  const {home, app} = state
  console.log(state)
  return ({
    ...home,
    ...app,
  })
})(IndexPage);
