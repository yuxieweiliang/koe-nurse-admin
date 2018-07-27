/* global consoel */
import { request } from '../utils'
import api from '../url'


/**
 * 请求所有用户
 * @returns {*}
 */
export async function getAllUser() {
  let url = api.getAllUser()

  try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }
}

/**
 * 注册
 * @returns {*}
 */
export async function register() {
  let url = api.getAllUser()


  console.log('注册功能，暂时保留！！！')


  /*try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }*/
}


/**
 * 添加用户信息
 * @param option
 * @returns {Promise.<void>}
 */
export async function postUserMessage(option) {
  let url = api.getAllUser()


  console.log('添加用户信息功能，暂时保留！！！')


  /*try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }*/
}
/**
 * 修改用户信息
 * @param option
 * @returns {Promise.<void>}
 */
export async function putUserMessage(option) {
  let url = api.getAllUser()


  console.log('修改用户信息功能，暂时保留！！！')


  /*try{
    let data = await request(url)

    return data.Data
  }catch(error) {
    console.log(error)
  }*/
}





