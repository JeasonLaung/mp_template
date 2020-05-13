export const auth = (type = 'scope.userLocation', title = '地理位置') => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '本页面需要获取您的' + title + '权限',
      success (res) {
        if (res.confirm) {
          wx.openSetting({
            success ({authSetting}) {
              if (authSetting[type]) {
                resolve(authSetting)
              } else {
                reject(authSetting)
              }
            },
            fail (res) {
              reject(res)
            }
          })
        } else {
          reject(res)
        }
      }
    })
  })
}


export const Auth  = {
  scopes: {
    location: {
      scope: 'scope.userLocation',
      title: '位置信息'
    },
  },



  /// 获取位置
  getLocation({
    success = ()=>{},
    fail=()=>{},
    complete=()=>{},
    type='gcj02',
    isHighAccuracy=true,
    altitude=false,
    highAccuracyExpireTime=3000
  }) {
    let _this = this
    return new Promise((resolve,reject) => {
      wx.getLocation({
        isHighAccuracy,
        highAccuracyExpireTime,
        altitude,
        type,
        complete,
        success() {
          success()
          resolve()
        },
        fail(e) {
          /// 失败
          _this.auth(scopes.location.scope, scopes.location.title).then(() => {
            _this.getLocation()
          }).catch(e => {
            fail(e)
            reject(e)
          })
        }
      })
    })
  },




  /// 调起统一按钮
  auth (type='', title='位置信息') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '本页面需要获取您的' + title + '权限',
        success (res) {
          if (res.confirm) {
            wx.openSetting({
              success ({authSetting}) {
                if (authSetting[type]) {
                  resolve(authSetting)
                } else {
                  reject(authSetting)
                }
              },
              fail (res) {
                reject(res)
              }
            })
          } else {
            reject(res)
          }
        }
      })
    })
  }
}