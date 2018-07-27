import {
  // 医院
  getAllHospital,
  // 科室
  getAllDepartment,
  postDepartment,
  putDepartment,
  deleteDepartment,
  // 专家
  getAllExport,
  // 医生
  getAllDoctor,
  postDoctor,
  putDoctor,
  deleteDoctor,
} from '../services/hospital'

const hospitalTableKey = [
  { title: 'ID', key: 'MerchantID', width: 100 },
  { title: '医院', key: 'MerchantName', width: 180 },
  { title: '科室', key: 'Department', width: 180 },
  { title: '电话', key: 'Telephone', width: 100 },
  { title: '删除', key: 'IsDeleted', width: 100 },
]
const departmentTableKey = [
  { title: 'ID', key: 'Dept_Code', width: 200 },
  { title: '科室', key: 'Dept_Name', width: 200 },
  { title: '医院', key: 'MerchantID' },
  { title: '是否可以删除', key: 'IsDeleted', width: 160 },
]
const exportTableKey = [
  { title: 'ID', key: 'Dept_Code', width: 200 },
  { title: '名字', key: 'UserTitle', width: 200 },
  { title: '医院', key: 'MerchantID' },
  { title: '是否可以删除', key: 'IsDeleted', width: 160 },
]
const doctorTableKey = [
  { title: 'ID', key: 'ID', width: 100 },
  { title: '姓名', key: 'UserName', width: 100 },
  { title: '年龄', key: 'Age', width: 60 },
  { title: '性别', key: 'Sex', width: 60 },
  { title: '电话', key: 'Telephone', width: 100 },
  { title: '医院', key: 'MerchantName', width: 180 },
  { title: '疾病', key: 'Illness_Name', width: 100 },
  { title: '身份证', key: 'IDCard' },
  { title: '身高', key: 'ShenGao', width: 60 },]


export default {
  namespace: 'hospital',

  state: {
    departmentTableKey,
    hospitalTableKey,
    exportTableKey,
    doctorTableKey,

    // 当前 医院 科室 专家
    department: null,
    hospital: null,
    export: null,
  },

  reducers: {
    hospitalList (state, { data }) {
      return {
        ...state,
        hospital: data[0],
        hospitalList: data,
      }
    },
    departmentList (state, { data }) {
      return {
        ...state,
        departmentList: data,
      }
    },
    postDepartment (state, { data }) {
      return {
        ...state,
        departmentList: data,
      }
    },
    putDepartment (state, { data }) {
      return {
        ...state,
        departmentList: data,
      }
    },
    deleteDepartment (state, { data }) {
      return {
        ...state,
        departmentList: data,
      }
    },
    exportList (state, { data }) {
      return {
        ...state,
        exportList: data,
      }
    },
    doctorList (state, { data }) {
      return {
        ...state,
        doctorList: data || [],
      }
    },
  },
  effects: {

    // ==================================
    //                               医院
    // ==================================
    * getAllHospital ( _, { put, call, select }) {

      const data = yield call(getAllHospital)

      yield put({
        type: 'hospitalList',
        data
      })
    },

    // ==================================
    //                               科室
    // ==================================
    * getAllDepartment ({ hospitalId }, { put, call, select }) {
      // 获取全部
      const data = yield call(getAllDepartment, hospitalId)

      console.log(data)
      yield put({
        type: 'departmentList',
        data
      })
    },
    // 添加
    * postDepartment ({ hospitalId }, { put, call, select }) {
      const data = yield call(postDepartment, hospitalId)

      yield put({
        type: 'postDepartment',
        data
      })
    },
    // 修改
    * putDepartment ({ hospitalId }, { put, call, select }) {
      const data = yield call(putDepartment, hospitalId)

      yield put({
        type: 'putDepartment',
        data
      })
    },
    // 删除
    * deleteDepartment ({ hospitalId }, { put, call, select }) {
      const data = yield call(deleteDepartment, hospitalId)

      yield put({
        type: 'deleteDepartment',
        data
      })
    },

    // ==================================
    //                               专家
    // ==================================
    * getAllExport ({ deptCode }, { put, call, select }) {
      const data = yield call(getAllExport, deptCode)

      yield put({
        type: 'exportList',
        data: [data]
      })
    },

    // ==================================
    //                       医院所有医生
    // ==================================
    * getAllDoctor ({ hospitalId }, { put, call, select }) {
      // 获取全部
      const data = yield call(getAllDoctor, hospitalId)

      yield put({
        type: 'doctorList',
        data
      })
    },
    // 新增
    * postDoctor ({ hospitalId, doctor}, { put, call, select }) {
      const data = yield call(postDoctor, hospitalId, doctor)

      yield put({
        type: 'doctorList',
        data
      })
    },
    // 修改
    * putDoctor ({ hospitalId, doctor }, { put, call, select }) {
      const data = yield call(putDoctor, hospitalId, doctor)

      yield put({
        type: 'doctorList',
        data
      })
    },
    // 删除
    * deleteDoctor ({ hospitalId }, { put, call, select }) {
      const data = yield call(deleteDoctor, hospitalId)

      yield put({
        type: 'doctorList',
        data
      })
    },


  },

}
