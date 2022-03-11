/**
 * @ Author: dqhu
 * @ Create Time: 2022-03-10 20:50:39
 * @ Modified time: 2022-03-11 09:38:38
 * @ Description:
 */

/** 网络请求工具类的拓展类，便于后期网络层修改维护 **/
import HttpUtils from './HttpUtils'

const API_URL = 'https://api.boostcamp.link/app';

/**
 * GET
 * 从缓存中读取数据
 * @param url 请求url
 * @param params 请求参数
 * @param callback 是否有回调函数
 * @returns {value\promise}
 */
const fetchData = (type: string) => (url: string, params: {} , callback: (arg0: any) => any)  => {

  url = `${API_URL}${url}`

  const fetchFunc = () => {
    let promise = type === 'get' ? HttpUtils.getRequest(url, params) : HttpUtils.postRequrst(url, params)
    if (callback && typeof callback === 'function') {
      promise.then(response => {
        return callback(response)
      })
    }
    return promise
  }
  return fetchFunc();
}

/**
 * GET 请求
 * @param url
 * @param params
 * @param source
 * @param callback
 * @returns {{promise: Promise}}
 */
const getFetch = fetchData('get')

/**
 * POST 请求
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const postFetch = fetchData('post')


export {getFetch, postFetch}