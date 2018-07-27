import { config } from './utils'
import template from 'url-template'
let {server: { auth, user, userData, system, file, register, cms }} = config

function createApi(url) {
  return (option) => template.parse(url).expand(option);
}

export default {
  register: `${register}/api/reg/post`,


  // 授权
  getToken: createApi(`${auth}/connect/token`),


  // 用户 { 列表 }
  getAllUser: createApi(`${user}/api/ClientUsers/GetAllUsers`),
  // 用户
  getUser: createApi(`${user}/api/ClientUsers/Get/{userId}`),


  // 医院
  getAllHospital: createApi(`${system}/api/Sys_Mer_Info/Get`),


  // 科室 { 列表 }
  getAllDepartment: createApi(`${system}/api/Sys_Dept_Info/Get/{hospitalId}`),
  // 新增
  postDepartment: createApi(`${system}/api/Sys_Dept_Info/Post`),
  // 修改
  putDepartment: createApi(`${system}/api/Sys_Dept_Info/Put/{deptCode}`),
  // 删除
  deleteDepartment: createApi(`${system}/api/Sys_Dept_Info/Delete/{deptCode}`),


  // 专家 科室人员
  getAllExport: createApi(`${system}/api/Sys_User_DeptInfo/GetByDeptCode/{deptCode}`),


  // 医生 医院所 { 列表 }
  getAllDoctor: createApi(`${system}/api/Sys_User_Info/Get/{hospitalId}`),
  // 新增
  postDoctor: createApi(`${system}/api/Sys_User_Info/Post`),
  // 修改
  putDoctor: createApi(`${system}/api/Sys_User_Info/Put/{userId}`),
  // 删除
  deleteDoctor: createApi(`${system}/api/Sys_User_Info/Delete/{userId}`),


  // 模板 { 列表 }
  getAllTemplate: createApi(`${cms}/api/Sys_Table_Template/GetList/{hospitalId}`),
  // 新增
  postTemplate: createApi(`${cms}/api/Sys_Table_Template/GetList/{hospitalId}`),
  // 修改
  putTemplate: createApi(`${cms}/api/Sys_Table_Template/GetList/{hospitalId}`),
  // 删除
  deleteTemplate: createApi(`${cms}/api/Sys_Table_Template/GetList/{hospitalId}`),

  // 报表 { 列表 }
  getAllPaperTemplate: createApi(`${cms}/api/Sys_Paper_Template/GetList/{hospitalId}`),
  // 报表 { 列表 }
  getAllPaperTemplateByType: createApi(`${cms}/api/Sys_Paper_Template/GetListByType/{hospitalId}/{type}`),




}


