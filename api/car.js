import axios from '../utils/axios'
export const getBrands = () => {
  return axios({
    url: '/rental/car/brand'
  })
}
export const getSeries = (data = {}) => {
  return axios({
    url: '/rental/car/series',
    data
  })
}
export const readCar = (data = {}) => {
  // id|carid|order|order_direction|brand_id|series_id|area_id|lat|lng|rent|date
  if (data['id']) {
    return axios({
      url: '/rental/car/read',
      data
    })
  } else {
    return axios({
      url: '/rental/car/index',
      data
    })
  }
}

export const view = (data = {}) => {
  // id
  return axios({
    url: '/rental/car/view',
    data
  })
}

export const collect = (data = {}) => {
  // id
  return axios({
    url: '/rental/car/collect',
    method: 'POST',
    data
  })
}

export const uncollect = (data = {}) => {
  // id
  return axios({
    url: '/rental/car/uncollect',
    method: 'POST',
    data
  })
}

export const carDate = (data = {}) => {
  // id
  return axios({
    url: '/rental/car/date',
    data
  })
}

export const myCollect = (data = {}) => {
  // id
  return axios({
    url: '/rental/car/myCollect',
    data
  })
}

export const getUseHistory = () => {
  return axios({
    url: '/rental/car/useHistory'
  })
}
