import axios from '../utils/axios'

export const saveOrder = (data = {}) => {
  // car_id
  return axios({
    url: '/rental/order/place',
    method: 'POST',
    data
  })
}

export const readMyOrder = (data = {}) => {
  // date|keyword
  return axios({
    url: '/rental/order/index',
    method: 'POST',
    data
  })
}

export const readMyCarOrder = (data = {}) => {
  // date|keyword|type=myCar
  return axios({
    url: '/rental/order/index',
    data: {
      ...data,
      type: 'myCar'
    }
  })
}

export const readOrder = (data = {}) => {
  return axios({
    url: '/rental/order/read',
    data
  })
}
