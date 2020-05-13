import axios from '../utils/axios'
import { SIGNATURE_NAME, SESSION_NAME } from '../config/index'
import store from '../store'
import cookie from '../utils/cookie'
import {$Toast} from '../mixins/index'
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success ({code}) {
        axios({
          url: '/rental/login/login',
          data: {code},
          error: false,
          all: true
        }).then(res => {
          cookie.set(SIGNATURE_NAME, res.header[SIGNATURE_NAME])
          cookie.set(SESSION_NAME, res.header[SESSION_NAME])
          resolve(res)
        }).catch(res => {
          cookie.set(SESSION_NAME, res.header[SESSION_NAME])
          reject(res)
        })
      }
    })
  })
}

export const getUserInfo = (data = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/rental/login/getUserInfo',
      data
    }).then(res => {
      store.commit('setUserInfo', res)
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}

export const setUserInfo = (data = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/rental/login/setUserInfo',
      method: 'POST',
      data
    }).then(res => {
      store.commit('setUserInfo', data)
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}

export const bindPhone = (data = {}) => {
  $Toast({
    type: 'loading',
    content: '正在登入...'
  })
  // code|phone
  return new Promise((resolve, reject) => axios({
      url: '/rental/login/bindPhone',
      method: 'POST',
      data
    }).then(data => {
      $Toast.hide()
      resolve()
    }).catch(data => {
      reject()
    })
  )
}

export const sendCode = (data = {}) => {
  // phone
  return axios({
    url: '/rental/login/sendCode',
    method: 'POST',
    data
  })
}

export const wxPhone = (data = {}) => {
  $Toast({
    type: 'loading',
    content: '正在登入...'
  })
  // iv|encryptedData
  return new Promise((resolve, reject) => {
    axios({
      url: '/rental/login/wxPhone',
      method: 'POST',
      data,
      all: true
    }).then(data => {
      cookie.set(SIGNATURE_NAME, data.header[SIGNATURE_NAME])
      resolve(data.data.data)
    }).catch(data => {
      reject(data)
      $Toast({
        content: data.data.msg,
        duration: 3
      })
    })
  })
}
