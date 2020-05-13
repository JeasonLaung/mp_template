import axios from '../utils/axios'

// 额度流水
export const readQuotaList = (data = {}) => {
  return axios({
    url: '/rental/account/quotaList',
    data
  })
}

// 余额流水
export const readBalanceList = (data = {}) => {
  return axios({
    url: '/rental/account/balanceList',
    data
  })
}

// 账号信息
export const getInfo = (data = {}) => {
  return axios({
    url: '/rental/account/index',
    data
  })
}
