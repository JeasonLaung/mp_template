import { MAP_KEY } from '../config/index'
let QQMapWX = require('../static/libs/qqmap-wx-jssdk.min.js')
export const qqmapsdk = new QQMapWX({
  key: MAP_KEY // 必填
})
