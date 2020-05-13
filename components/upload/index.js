// components/upload/index.js
import {upload, getOrcToken} from '../../api/index'
import axios from '../../utils/axios.js'
import {REQUEST_HOST} from '../../config/index'
const orc_api = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    let filePath = data['filePath'] || ''
    delete(data['filePath'])
    wx.getFileSystemManager().readFile({
      filePath, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        // 上传百度orc
        let image = res.data
        getOrcToken().then(res => {
          axios({
            absolute: true,
            custom:true,
            url: REQUEST_HOST + '/ocr/v1' + url + '?access_token=' + res,
            data: {
              image,
              ...data
            },
            method: 'POST',
            header:{
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(({data}) => {
            // console.log(data)
            // if (errno !== 0) {
            //   reject(msg)
            //   return false
            // }
            // data.image_status === 'normal' || 
            if (data.words_result_num > 0) {
              resolve(data)
            } else{
              reject(data)
              console.error('orc识别失败，请手动输入或重试')
            }
          }).catch(data => {
            reject(data || 'orc识别功能异常，请手动输入或重试')
            console.error('orc识别功能异常，请手动输入或重试')
          })
        }).catch(data => {
          reject('获取失败百度AI的access token失败')
          console.log('获取失败百度AI的access token失败 ' + data)
        })
      }
    })
  })
}
const orc_idcard = (data = {}) => {
  let { filePath, side, direction} = data
  let oData = { filePath, id_card_side: side || 'front', detect_direction: direction || false}
  return new Promise((resolve, reject) => {
    orc_api('/idcard', oData).then(({ words_result}) => {
      let tmp = {}
      tmp['id_card'] = words_result['公民身份号码'].words
      tmp['real_name'] = words_result['姓名'].words
      tmp['address'] = words_result['住址'].words
      tmp['gender'] = words_result['性别'].words
      tmp['natvie'] = words_result['民族'].words
      resolve(tmp)
    }).catch(data => {
      reject(data)
    })
  })
}
const orc_license = (data = {}) => {
  let { filePath, side, direction} = data
  let oData = { filePath, vehicle_license_side: side || 'front', detect_direction: direction || false}
  return new Promise((resolve, reject) => {
    // return resolve([1,2,3,45])
    orc_api('/vehicle_license', oData).then(({ words_result}) => {
      let tmp = {}
      tmp['model'] = words_result['品牌型号'].words
      tmp['engine_no'] = words_result['发动机号码'].words
      tmp['register_date'] = words_result['注册日期'].words.replace(/(.{4})(.{2})(.{2})/, ($0, $1, $2, $3) => $1 + '-' + $2 + '-' + $3)
      tmp['vin'] = words_result['车辆识别代号'].words
      resolve(tmp)
    }).catch(data => {
      reject(data)
    })
  })
}
Component({
  attached () {
    let _this = this
    if (_this.data.value) {
      _this.setData({
        filePath: _this.data.value,
        status: 200
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: ''
    },
    index: {
      type: Number,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    orc: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    filePath: '',
    // 未选择图片
    status: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    orc_idcard,
    orc_license,
    chooseImage () {
      let _this = this
      wx.showActionSheet({
        itemList: ['从相册上传', '拍照上传'],
        success ({tapIndex}) {
          switch (tapIndex) {
            case 0:
              wx.chooseImage({
                count: 1,
                sourceType: ['album'],
                sizeType: ['compressed'],
                success: function (res) {
                  const filePath = res.tempFilePaths[0]
                  _this.setData({
                    filePath,
                    status: 0
                  })
                  if (_this.data.orc) {
                    _this['orc_' + _this.data.orc]({filePath}).then(data => {
                      console.log(data)
                      _this.triggerEvent('orcchange', data)
                    }).catch(data => {
                      console.error(data)
                    })
                  }
                  upload({
                    filePath 
                  }).then(({path}) => {
                    _this.setData({
                      status: 200
                    })
                    _this.triggerEvent('change', path)
                  }).catch(data => {
                    _this.setData({
                      status: 400
                    })
                  })
                },
              })
              break
            case 1:
              wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['camera'],
                success: function (res) {
                  const filePath = res.tempFilePaths[0]
                  _this.setData({
                    filePath,
                    status: 0
                  })
                  if (_this.data.orc) {
                    _this['orc_' + _this.data.orc]({ filePath }).then(data => {
                      _this.triggerEvent('orcchange', data)
                    }).catch(data => {
                      _this.triggerEvent('orcerror', data)
                      console.error(data)
                    })
                  }
                  upload({
                    filePath
                  }).then(({ path }) => {
                    _this.setData({
                      status: 200
                    })
                    _this.triggerEvent('change', path)
                  }).catch(data => {
                    _this.setData({
                      status: 400
                    })
                  })
                },
              })
              break
          }
        }
      })
      
    }
  }
})
