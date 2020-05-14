import axios from '../utils/axios'
import cookie from '../utils/cookie.js'

export const upload = (data = {}) => {
  let { filePath } = data
  delete (data['filePath'])
  return axios({
    url: '/rental/upload/upload',
    upload: true,
    filePath,
    name: 'image',
    data
  })
}

export const feedback = (data = {}) => {
  return axios({
    url: '/rental/action/feedback',
    data,
    method: 'POST'
  })
}
export const report = (data = {}) => {
  return axios({
    url: '/rental/action/report',
    data,
    method: 'POST'
  })
}
// 获取百度ORC token
export const getOrcToken = () => {
  return new Promise((resolve, reject) => {
    let orc = cookie.get('BAIDU_ORC_TOKEN') || {}
    let now = new Date().getTime()
    if (!orc.expires || orc.expires < now) {
      axios({
        url: '/api/baidu_orc/getToken'
      }).then((data) => {
        cookie.set('BAIDU_ORC_TOKEN', data)
        resolve(data.access_token)
      }).catch(data => {
        reject(data)
        console.log('获取baidu_access_token失败' + data)
      })
    } else {
      resolve(orc.access_token)
    }
  })
}
