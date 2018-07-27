import { routerRedux } from 'dva/router'
import { login, logout } from '../services/app'


export default {
  namespace: 'app',

  state: {
  },

  reducers: {
    loginSuccess (state, { data }) {
      return { ...state, token: data, }
    },
  },
  effects: {
    * login ({ payload }, { put, call, select }) {
      const data = yield call(login, payload)

      console.log(data)
      if (data) {
        yield put({
          type: 'loginSuccess',
          data
        })
        yield put(routerRedux.push('/'))
      } else {
        throw data
      }
    },
    * logout ({ payload }, { put, call, select }) {
      const data = yield call(logout, payload)
      yield put({
        type: 'loginSuccess',
        data: null
      })
      yield put(routerRedux.push('/login'))
      console.log('data')
    },
  },

}
