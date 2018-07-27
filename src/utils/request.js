import fetch from 'dva/fetch';
import { storage, typeOf } from '../utils'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  let token = await storage.getItem('system.token')
  let option = options || { }

  if(token) {
    option.headers = options && options.headers || { }
    option.headers.Authorization = `Bearer ${token.access_token}`
  }

  if(options && typeOf(options.body) === 'object') {
    option.body = JSON.stringify(options.body)
  }

  return fetch(url, option)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => ({ err }));
}
