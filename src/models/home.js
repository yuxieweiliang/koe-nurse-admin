import RolePage from '../routes/user/Role'
import HospitalPage from '../routes/hospital/Hospital'
import DepartmentPage from '../routes/hospital/Department'
import ExportPage from '../routes/hospital/Export'
import DoctorPage from '../routes/hospital/Doctor'
import TemplatePage from '../routes/hospital/Template'
import ReportformPage from '../routes/hospital/Reportform'

const routes = {
  role: {
    title: '用户',
    content: <DepartmentPage/>,
    key: 'role',
    closable: false
  },
  hospital: {
    title: '医院',
    content: <HospitalPage/>,
    key: 'hospital'
  },
  authentication: {
    title: '认证',
    content: <HospitalPage/>,
    key: 'authentication'
  },
  department: {
    title: '科室',
    content: <DepartmentPage/>,
    key: 'department'
  },
  export: {
    title: '专家',
    content: <ExportPage/>,
    key: 'export'
  },
  doctor: {
    title: '医生',
    content: <DoctorPage/>,
    key: 'doctor'
  },
  template: {
    title: '模板',
    content: <TemplatePage/>,
    key: 'template'
  },
  reportForm: {
    title: '报表',
    content: <ReportformPage/>,
    key: 'reportForm'
  },
}

export default {

  namespace: 'home',

  state: {
    menu: [
      {
        title: '用户',
        key: 'user',
        children: [
          {title: '角色', key: 'role'},
          {title: '认证', key: 'authentication'},
        ]
      },
      {
        title: '医院',
        key: 'hospital',
        children: [
          {title: '医院', key: 'hospital'},
          {title: '科室', key: 'department'},
          {title: '专家', key: 'export'},
          {title: '医生', key: 'doctor'},
          {title: '模板', key: 'template'},
          {title: '报表', key: 'reportForm'},
        ]
      },
      {
        title: '系统',
        key: 'admin',
        children: [
          {title: '设置', key: 'setting'},
          {title: '主题', key: 'theme'},
        ]
      },
    ],
    activeKey: 'role',
    panes: [],
  },

  reducers: {
    fetchMenu(state, action) {
      return { ...state, ...action.payload };
    },
    changeTab (state, { route }) {
      let { panes } = state
      let hasItem = false

      panes.forEach(function(item) {
        if(item.key === route) {
          hasItem = true
        }
      })

      if(!hasItem) {
        panes.push(routes[route])
      }

      return {  ...state, panes, activeKey: route  }
    },
    removeTabItem (state, { route }) {
      let { panes } = state

      panes = panes.filter(pane => pane.key !== route);

      let activeKey = panes[panes.length -1].key

      return {  ...state, panes, activeKey  }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          // dispatch({ type: 'fetchMenu' });
        }
      });
    },
  },

  effects: {
    *fetchMenu(action, { call, put }) {
      console.log( 'dispatch, history' )

      console.log( action, call, put )

      yield put();
    },
    * changeOrAddTab ({ menuItem, token }, { put, call, select }) {

      yield put({type: 'changeTab', route: menuItem })
    },
    * removeTab ({ menuItem }, { put, call, select }) {

      yield put({type: 'removeTabItem', route: menuItem })
    },
  },


};
