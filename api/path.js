import axios from '../utils/axios'

export const readOwner = (data = {}) => {
  return axios({
    url: '/rental/path/readOwner',
    data
  })
}

export const readPath = (data = {}) => {
  // id|order_id
  if (data['id']) {
    return axios({
      url: '/rental/path/read',
      data
    })
  } else {
    return axios({
      url: '/rental/path/index',
      data
    })
  }
}

export const pathDate = (data = {}) => {
  // date
  return axios({
    url: '/rental/path/index',
    data
  })
}

export const checkNow = (data = {}) => {
  // date
  return axios({
    error: false,
    url: '/rental/path/checkNow',
    data
  })
}

export const deletePath = (data = {}) => {
  // date
  return axios({
    url: '/rental/path/cancel',
    method: 'POST',
    data
  })
}

export const updatePath = (data = {}) => {
  // id,polylines,order_id,finish_address,finish,distance,finish_time
  return axios({
    url: '/rental/path/end',
    method: 'POST',
    data
  })
}

export const savePath = (data = {}) => {
  // polylines,order_id,start,finish,start_address,finish_address,distance,reason,duration
  return axios({
    url: '/rental/path/plan',
    method: 'POST',
    data
  })
}
