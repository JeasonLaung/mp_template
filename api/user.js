import axios from '../utils/axios'
import store from '../store'
import {$go} from '../mixins/index'

export const setUserInfo = (data = {}) => {
  // name,nickname,avatar,city,province,gender
  return new Promise((resolve, reject) => {
    axios({
      url: '/rental/user/setUserInfo',
      data
    }).then(res => {
      store.commit('setUserInfo', data)
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}
export const getAccount = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/rental/user/getAccount'
    }).then(res => {
      store.commit('setUserInfo', res)
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}
export const logout = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/rental/user/logout'
    }).then(res => {
      store.commit('setUserInfo', {})
      $go('/pages/login/index', 'reLaunch').then(res => {
        resolve(res)
      })
    }).catch(res => {
      reject(res)
    })
  })
}

export const setAutoPath = (data) => {
  return axios({
    url: '/rental/user/setAutoPath',
    data,
    method: 'POST'
  })
}
export const getAutoPath = (data) => {
  return axios({
    data,
    url: '/rental/user/getAutoPath'
  })
}


export const readAutoPath = (data) => {
  return new Promise((resolve, reject) => {
    if (data['id']) {
      return axios({
        data,
        url: '/rental/user/readRandomPath'
      }).then(data => {
        resolve(data)
      }).catch(data => {
        reject(data)
      })
    } else {
      return axios({
        data,
        url: '/rental/user/getAutoPath'
      }).then(data => {
        resolve({data: data['random_paths']})
      }).catch(data => {
        reject(data)
      })
    }
    
  })
}


export const saveAutoPath = (data) => {
  if (data['id']) {
    return axios({
      method: 'POST',
      data,
      url: '/rental/user/editRandomPath'
    })
  } else {
    return axios({
      method: 'POST',
      data,
      url: '/rental/user/addRandomPath'
    })
  }
}

export const cancelAutoPath = (data) => {
  return axios({
    method: 'GET',
    url: '/rental/user/delAutoPath'
  })
}

export const delAutoPath = (data) => {
  return axios({
    method: 'POST',
    data,
    url: '/rental/user/delRandomPath'
  })
}