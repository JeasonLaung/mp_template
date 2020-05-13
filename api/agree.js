import axios from '../utils/axios'

export const readAgree = (data) => {
  // id|name|title
  if (data instanceof String) {
    return axios({
      url: '/rental/agree/' + data
    })
  } else {
    return axios({
      url: '/rental/agree/index',
      data
    })
  }
}

export const signAgree = (data = {}) => {
  // agree_id|[car_id]
  return axios({
    url: '/rental/agree/sign',
    data,
    method: 'POST'
  })
}
// 检查没有签订的条款
export const checkSign = () => {
  return axios({
    error: false,
    url: '/rental/agree/checkSign'
  })
}
// 检查没有签订的条款
export const checkAgree = () => {
  return axios({
    url: '/rental/agree/checkAgree'
  })
}
