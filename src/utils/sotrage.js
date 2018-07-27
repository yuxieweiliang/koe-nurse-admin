/* global window */
let defaultExpires = 1000 * 3600 * 24 // one day
class Storage {
  constructor(options = {}) {
    this._SIZE = options.size || 1000;   // maximum capacity 最大容量
    this.defaultExpires = options.defaultExpires || defaultExpires;// 过期时间
    this.enableCache = options.enableCache !== false; // 使用缓存
    this._storage = window.localStorage;
    this._innerVersion = 1;
    this.cache = {}; // 缓存
  }

  /**
   * 读取key字段并将结果作为第二个参数传递给callback。
   * 如果有任何错误发生，则会传递一个Error对象作为第一个参数。
   * 返回一个Promise对象。
   * @param key
   * @returns {*|Promise.<TResult>}
   */
  getItem(key) {
    // 获取当前时间
    let now = new Date().getTime();
    let storageData = this._storage.getItem(key)
    if(storageData) {
      let data = JSON.parse(storageData)
      if(data.expires <= now) {
        this.removeItem(key)
        return null
        // return this.sync[key](option)
      }
      return data.data
    } else {
      this.removeItem(key)
      return null
    }
  }

  /**
   * 将key字段的值设置成value，并在完成后调用callback函数。
   * 如果有任何错误发生，则会传递一个Error对象作为第一个参数。
   * 返回一个Promise对象。
   * @param key 保存的 key
   * @param data 保存的 数据
   * @param expires 时间戳
   * @returns {*}
   */
  setItem(key, data, expires = this.defaultExpires) {
    // 组装数据
    let dataToSave = { data: data };
    // 获取当前时间
    let now = new Date().getTime();

    if (key.toString().indexOf('_') !== -1) {
      console.error('Please do not use "_" in key!');
    }

    if (typeof data === 'undefined') {
      console.error('"data" is required in setItem()!');
    }

    // 添加时间戳
    if(expires !== null) {
      dataToSave.expires = now + expires;
    }

    // 添加内存缓存
    if(this.enableCache) {
      this.cache[key] = dataToSave;
    }
    return this._storage.setItem(key, JSON.stringify(dataToSave))
  }

  /**
   * 删除一个字段。返回一个Promise对象。
   * @param key
   * @returns {*}
   */
  removeItem(key) {
    return this._storage.removeItem(key)
  }

  /**
   * 删除全部的AsyncStorage数据，不论来自什么库或调用者。
   * 通常不应该调用这个函数——使用removeItem或者multiRemove来清除你自己的key。
   * 返回一个Promise对象。
   * @returns {*}
   */
  clear(key) {
    this._storage.clear()
  }


}
export default new Storage()
