/* global window */
import _ from 'lodash'

export config from './config'
export request from './request'
export { color } from './theme'
export storage from './sotrage'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}

/**
 * 转码
 * @param str
 * @returns {string}
 */
export function b64Encode(str) {
  return btoa(encodeURIComponent(str)
    .replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    })
  );
}
/**
 * 解码
 * @param str
 * @returns {string}
 */
export function b64Decode(str) {
  return decodeURIComponent(atob(str)
    .split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
/**
 * @param  name {String}
 * @return  {String}
 */
export function queryURL (name) {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    key
 * @param   {String}    keyAlias
 * @return  {Array}
 */
export function queryArray (array, key, keyAlias = 'key') {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTree (array, id = 'id', pid = 'pid', children = 'children') {
  let data = _.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
/**
 * 获取当前值的类型
 * @param obj
 * @param target
 * @returns {*}
 */
export function typeOf(obj, target) {
  var _obj = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

  if (target) {
    return _obj === target
  }
  return _obj
}
/**
 * 组装查询字符串 &key=value&key=value
 * @param params
 * @returns {string}
 */
export function createParams(params) {
  var string = ''
  if(typeOf(params, 'object')) {
    // 如果是 对象
    for(var key in params) {
      string += `${key}=${params[key]}&`
    }
  } else {
    console.log('params is no string or object')
  }
  return string.substring(0, string.length -1)
}


/**
 * 为表格添加 key
 * @param option
 * @returns {string}
 */
export function createTableBody(option) {
  return option ? (
    option.map((item, key) => ({ key, ...item,}))
  ) : null
}
