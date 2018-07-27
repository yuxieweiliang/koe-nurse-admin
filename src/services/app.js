/* global consoel */
import { request, createParams, storage } from '../utils'
import api from '../url'





/**
 * 登录
 * @param username
 * @param password
 * @returns {*}
 */
export async function login({username, password}) {
  let url = api.getToken()
  let option = {
    method: 'post',
    headers: {
      'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: createParams({
      username: 'loginname|1001|' + username,
      password: password, // 'xyf.3342
      client_id: 'APPClient',
      client_secret: '4FA42C86ED02A2EB905E94F25D359C05',
      scope: 'offline_access',
      grant_type: 'password',
    })
  }

  try{
    let token = await request(url, option)

    if(token.ok === false) {
      consoel.log('登录失败，请输入正确的用户名和密码！')
      return false;
    }

    storage.setItem('system.token', token)
    return token
  }catch(error) {
    storage.removeItem('system.token')
    console.log(error)
  }
}

/**
 * 退出
 * @returns {*}
 */
export async function logout() {
  storage.removeItem('system.token')
  console.log('logout')
  return true
}







/*export function login (data) {


  console.log(userLogin)


  return request({
    url: userLogin,
    method: 'post',
    data,
  })
}*/
