/* global consoel */
import { request } from '../utils'
import api from '../url'

/**
 * 医院列表
 * @returns {*}
 */
export async function getAllHospital() {
  let url = api.getAllHospital()

  console.log(url)

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}

// =========================================================
//                               科室
// =========================================================
/**
 * 列表
 * @param hospitalId
 * @returns {*}
 */
export async function getAllDepartment(hospitalId) {
  let url = api.getAllDepartment({hospitalId})

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}
/**
 * 新增
 * @param option
 * @returns {*}
 */
export async function postDepartment(option) {
  let url = api.postDepartment()

  try{
    let data = await request(url, option)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}
/**
 * 修改
 * @param deptCode
 * @returns {*}
 */
export async function putDepartment(deptCode) {
  let url = api.putDepartment({deptCode})

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}
/**
 * 删除
 * @param deptCode
 * @returns {*}
 */
export async function deleteDepartment(deptCode) {
  let url = api.deleteDepartment({deptCode})

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}

// =========================================================
//                               专家
// =========================================================
/**
 * 列表
 * @param deptCode
 * @returns {*}
 */
export async function getAllExport(deptCode) {
  let url = api.getAllExport({deptCode})

  try{
    let data = await request(url)

    console.log(data)
    return data.Data
  }catch(error) {
    console.log(error)
  }
}

// =========================================================
//                               医生 医院所有人
// =========================================================
/**
 * 列表
 * @param hospitalId
 * @returns {*}
 */
export async function getAllDoctor( hospitalId ) {
  let url = api.getAllDoctor({ hospitalId })

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}
// 新增
export async function postDoctor( hospitalId, body ) {
  let url = api.postDoctor({ hospitalId })

  try{
    let data = await request(url, { method: 'post', body })

    console.log(data)
    return data.Data
  }catch(error) {
    console.log(error)
  }
}
// 修改
export async function putDoctor( hospitalId ) {
  let url = api.putDoctor({ hospitalId })

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}
// 删除
export async function deleteDoctor( hospitalId ) {
  let url = api.deleteDoctor({ hospitalId })

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}


