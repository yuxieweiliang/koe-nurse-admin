import { getAllUser, register, postUserMessage, putUserMessage } from '../services/user'
const key = [
  { title: 'ID', key: 'ID', dataIndex: 'ID', width: 100, fixed: 'left' },
  { title: '姓名', key: 'UserName',  dataIndex: 'UserName', width: 100 },
  { title: '年龄', key: 'Age', dataIndex: 'Age', width: 80 },
  { title: '性别', key: 'Sex', dataIndex: 'Sex', width: 80 },
  { title: '电话', key: 'Telephone', dataIndex: 'Telephone', width: 100 },
  { title: '医院', key: 'MerchantName', dataIndex: 'MerchantName', width: 180 },
  { title: '疾病', key: 'Illness_Name', dataIndex: 'Illness_Name', width: 100 },
  { title: '身份证', key: 'IDCard', dataIndex: 'IDCard' },
  { title: '身高', key: 'ShenGao', dataIndex: 'ShenGao', width: 100 },
]

export default {
  namespace: 'user',

  state: {
    userTableKey: key,
    user: null,
  },

  reducers: {
    getAllUserSuccess (state, { data }) {

      return {
        ...state,
        allUser: data,
      }
    },
    setUser (state, { user }) {

      console.log(user)
      return {
        ...state,
        user,
      }
    },
  },
  effects: {
    * getAllUser ({ payload }, { put, call, select }) {
      const data = yield call(getAllUser, payload)

      yield put({
        type: 'getAllUserSuccess',
        data
      })
    },
    * setUserMsg ({ user }, { put, call, select }) {

      yield put({type: 'setUser', user })

    },
    * postUserMessage ({ data }, { put, call, select }) {
      const user = yield call(postUserMessage, data)
      console.log(data)

      // yield put({type: 'setUser', user })

    },
    * putUserMessage ({ data }, { put, call, select }) {
      const user = yield call(putUserMessage, data)
      console.log(data)

      // yield put({type: 'setUser', user })

    },
    // 注册
    * register ({ data }, { put, call, select }) {
      const user = yield call(register, data)

      console.log(data)
      yield put({type: 'setUser', user })

    },
  },

}
