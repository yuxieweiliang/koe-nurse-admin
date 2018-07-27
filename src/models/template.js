import {
  // 模板
  getAllTemplate,
  postTemplate,
  putTemplate,
  deleteTemplate,
  getAllPaperTemplate,
  getAllPaperTemplateByType,
} from '../services/template'

const tableItemKey = [
  { title: '医院', key: 'MerchantName', width: 180 },
  { title: 'ID', key: 'ID', width: 100 },
  { title: '英文缩略名', key: 'ItemName', width: 140 },
  { title: '显示名称', key: 'ShowName', width: 100 },
  { title: '字段类型', key: 'FeildType', width: 100 }, // 0,小字段小于64字节，1：大字段大于64字节
  { title: '索引', key: 'ShowIndex', width: 100 },
  { title: '是否保存', key: 'NeedSave', width: 100 }, // 是否需要保存（1：保存，0：不保存）
  { title: '默认值', key: 'DefaultValues' },
  { title: '默认分数', key: 'DefaultScores', width: 100 },
]

const templateKey = [
  { title: 'ID', key: 'ID', width: 100 },
  { title: '医院', key: 'MerchantID', width: 100 },
  { title: '模版ID', key: 'TemplateID', width: 180 },
  { title: '名称', key: 'TemplateName', width: 100 },
  { title: '类型', key: 'TemplateType' },
  { title: '状态', key: 'Status', width: 100 }, // 模板状态（0：正常，1停用）
  { title: '索引', key: 'ShowIndex', width: 100 },
]

const paperKey = [
  { title: 'ID', key: 'ID', width: 100 },
  { title: '医院', key: 'MerchantID', width: 100 },
  { title: '模版ID', key: 'TemplateID', width: 180 },
  { title: '名称', key: 'TemplateName', width: 220 },
  { title: '类型', key: 'TemplateType' },
  { title: '模板标题', key: 'TemplateTitle', width: 180 },
  { title: '状态', key: 'Status', width: 100 }, // 模板状态（0：正常，1停用）
  { title: '索引', key: 'ShowIndex', width: 100 },
]

export default {
  namespace: 'template',

  state: {
    tableItemKey,
    templateKey,
    paperKey,
    // 编辑中的数据
    tableItem: null,
    template: null,
    paper: null,

  },

  reducers: {
    templateList (state, { data }) {
      return {
        ...state,
        templateList: data,
      }
    },
    paperTemplateList (state, { data }) {
      return {
        ...state,
        paperTemplateList: data,
      }
    },
  },
  effects: {

    // ==================================
    //                               医院
    // ==================================
    * getAllTemplate ({ hospitalId }, { put, call, select }) {

      const data = yield call(getAllTemplate, hospitalId)

      console.log(data)
      yield put({
        type: 'templateList',
        data
      })
    },
    * postTemplate ({ hospitalId }, { put, call, select }) {

      const data = yield call(postTemplate, hospitalId)

      console.log(data)
      yield put({
        type: 'templateList',
        data
      })
    },
    * putTemplate ({ hospitalId }, { put, call, select }) {

      const data = yield call(putTemplate, hospitalId)

      console.log(data)
      yield put({
        type: 'templateList',
        data
      })
    },
    * deleteTemplate ({ hospitalId }, { put, call, select }) {

      const data = yield call(deleteTemplate, hospitalId)

      console.log(data)
      yield put({
        type: 'templateList',
        data
      })
    },
    * getAllPaperTemplate ({ hospitalId }, { put, call, select }) {
      const data = yield call(getAllPaperTemplate, hospitalId)

      console.log(data)
      yield put({
        type: 'paperTemplateList',
        data
      })
    },
    // 指定类型的报表模板 比如 电话随访
    * getAllPaperTemplateByType ({ hospitalId, type }, { put, call, select }) {
      const data = yield call(getAllPaperTemplateByType, hospitalId, type)

      console.log(data)
      yield put({
        type: 'paperTemplateList',
        data
      })
    },

  },

}
