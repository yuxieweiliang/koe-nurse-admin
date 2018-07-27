/* global consoel */
import { request } from '../utils'
import api from '../url'


/**
 * 请求所有表格模板
 * @returns {*}
 postTemplate,
 putTemplate,
 deleteTemplate
 */
export async function getAllTemplate(hospitalId) {
  let url = api.getAllTemplate({ hospitalId })

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}
// 添加
export async function postTemplate(hospitalId) {
  let url = api.postTemplate({ hospitalId })

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}
// 修改
export async function putTemplate(hospitalId) {
  let url = api.putTemplate({ hospitalId })

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}
// 删除
export async function deleteTemplate(hospitalId) {
  let url = api.deleteTemplate({ hospitalId })

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}

/**
 * 请求所有报表
 * @returns {*}
 */
export async function getAllPaperTemplate(hospitalId) {
  let url = api.getAllPaperTemplate({ hospitalId })

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}

/**
 * 请求所有报表
 * @returns {*}
 */
export async function getAllPaperTemplateByType(hospitalId, type) {
  let url = api.getAllPaperTemplateByType({ hospitalId, type })

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}




