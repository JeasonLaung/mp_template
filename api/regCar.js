import axios from '../utils/axios'

// 删除车辆
export const deleteCar = (data = {}) => {
  return axios({
    url: '/rental/reg_car/delete',
    method: 'POST',
    data
  })
}

// 完善车辆信息
export const perfectCar = (data = {}) => {
  // 按type分
  // car_id,vin,engine_no,register_date,model,license_before,license_after,real_name,id_card,id_card_before,id_card_after,jiaoqiang_image,transmission,config,seat,color,photos,note
  return axios({
    url: '/rental/reg_car/perfect',
    method: 'POST',
    data
  })
}

// 更新已审核通过的车辆
export const updateCar = (data = {}) => {
  // rent,running
  return axios({
    url: '/rental/reg_car/update',
    method: 'POST',
    data
  })
}
export const getPerfectPart = (data = {}) => {
  // rent,running
  return axios({
    url: '/rental/reg_car/getPerfectPart',
    method: 'POST',
    data
  })
}
// 我的车辆
export const myCar = (data = {}) => {
  // keyword,status
  if (data['id']) {
    return axios({
      url: '/rental/reg_car/read',
      data
    })
  } else {
    return axios({
      url: '/rental/reg_car/index',
      data
    })
  }
}

// 预新增车辆
export const saveCar = (data = {}) => {
  // owner_name,carid,series_id,brand_id,register_year
  return axios({
    url: '/rental/reg_car/register',
    method: 'POST',
    data
  })
}

export const submitCar = (data = {}) => {
  // id
  return axios({
    url: '/rental/reg_car/submit',
    method: 'POST',
    data
  })
}

export const withdrawCar = (data = {}) => {
  // id
  return axios({
    url: '/rental/reg_car/withdraw',
    method: 'POST',
    data
  })
}

export const getExamplePhotos = (data = {}) => {
  // id
  return axios({
    url: '/rental/reg_car/getExamplePhotos',
    data
  })
}
