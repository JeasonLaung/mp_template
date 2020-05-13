import axios from '../utils/axios'

// export const saveShortcut = (data = {}) => {
//   // car_id
//   return axios({
//     url: '/rental/shortcut/save',
//     method: 'POST',
//     data
//   })
// }

export const readShortcut = (data = {}) => {
  // date|keyword
  return axios({
    url: '/rental/shortcut/index',
    method: 'GET',
    data
  })
}
export const readMyShortcut = (data = {}) => {
  // date|keyword
  return axios({
    url: '/rental/shortcut/my',
    method: 'GET',
    data
  })
}

// export const deleteShortcut = (data = {}) => {
//   return axios({
//     url: '/rental/shortcut/delete',
//     data
//   })
// }
export const updateShortcut = (data = {}) => {
  return axios({
    url: '/rental/shortcut/update',
    data,
    method: 'POST'
  })
}
