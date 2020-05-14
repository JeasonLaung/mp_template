import { WEBSOCKET_HOST, APP_KEY, SIGNATURE_NAME } from '../config/index'
import cookie from '../utils/cookie'
import {empty} from '../utils/index'
import {$go, $Toast} from '../mixins/index'
import store from '../store'
import { Global } from './global'
export const  GlobalWebsocket  = {
  // 1.7.0 及以上版本，最多可以同时存在 5 个 WebSocket 连接。
  // 1.7.0 以下版本，一个小程序同时只能有一个 WebSocket 连接，如果当前已存在一个 WebSocket 连接，会自动关闭该连接，并重新创建一个 WebSocket 连接。

  heartBeatMsg: {
    type: 'hello'
  },
  /// 30 秒
  heartBeatTime: 30,
  /// 单个socket
  _socket: null,

  /// 信息传递监听器
  _messageListeners: [],

  /// 打开监听器
  _openListeners: [],

  /// 关闭监听器
  _closeListeners: [],

  _timer: null,

  /// 开启
  open() {
    return new Promise((resolve, reject) => {
      let _this = this
      if (!empty(_this._socket)) {
        return resolve()
      }
      _this._socket = wx.connectSocket({
        url: WEBSOCKET_HOST,
        header:{
          // 'content-type': 'application/json',
          [APP_KEY]: 'mpcx',
          [SIGNATURE_NAME]: cookie.get(SIGNATURE_NAME),
        },
        success(e) {
          console.log('************websocket 连接成功')
          console.log(e)
        },
        fail(e) {
          console.error('***********websocket 连接失败')
          reject(e)
        },
        complete() {
          console.log('***********websocket 连接完毕')
        }
      })


      /// 开启事件
      _this._socket.onOpen((e) => {
        /// 开启后立刻登录（所以一定要先登录才开，不然还是会自动断）
        let jwt = cookie.get(SIGNATURE_NAME)
        let phone = store.states.userInfo['phone']
        if(!jwt || !phone) {
          return wx.showModal({
            title: '请先登录',
            success({confirm}) {
              if (confirm) {
                $go('/pages/login/index')
                _this.close()
              }
            }
          })
        }

        let systemInfo = wx.getSystemInfoSync()
        /// 有问题后期需要改
        let model = systemInfo.model

        /// 发送登录消息
        _this.send({
          type: 'bind_user',
          data: {
            jwt,
            device_token: `${phone}-${model}`
          }
        })

        resolve()

        /// 发送心跳时间
        clearInterval(_this._timer)
        _this._timer = setInterval(() => {
          _this.send(_this.heartBeatMsg)
        }, _this.heartBeatTime * 1000)


        _this._openListeners.forEach(item => {
          try{
            item(e)
          }catch(error){
            console.error(error)
          }
        })
      })

      /// 关闭事件
      _this._socket.onClose((e) => {
        _this._closeListeners.forEach(item => {
          try{
            item(e)
          }catch(error){
            console.error(error)
          }
        })
        _this._socket = null
      })

      /// 消息事件
      _this._socket.onMessage((data) => {
        console.log('***********收到message开始')
        console.log(data)
        console.log('***********收到message结束')
        try{
          let _data = JSON.parse(data['data'])
          
          
          /// data传一个继续进行的话，继续往下走
          if (_data['status'] == 0 && !_data['continue']) {
            /// 全局事件处理
            // webscoket逼退
            if (_data['type'] == 'logout') {
              Global.logout()
              wx.showModal({
                title: _data['msg'],
                success() {
                  $go('/pages/login/index', 'reLaunch')
                },
                fail() {
                  $go('/pages/login/index', 'reLaunch')
                }
              })
              return false
            }


            /// 新消息
            if (_data['type'] == 'refresh_notice') {
              wx.vibrateShort()
            }

            // 异常跳转
            if (_data['errRedirect']) {
              wx.showModal({
                title: _data['msg'],
                success({confirm}) {
                  if (confirm) {
                    $go(_data['errRedirect'])
                  }
                }
              })
            } else {
              return $Toast({
                content: _data['msg']
              })
            }
          }
          _this._messageListeners.forEach(item => {
            if(typeof item == 'function') {
              item(_data)
            }
          })
        }catch(error){
          console.error(data)
          console.error(error)
        }
      })
    })
  },

  /// 主动发送
  send(data) {
    let dataString = ''
    return new Promise((resolve, reject) => {
      if (typeof data == 'object') {
        dataString = JSON.stringify(data)
      } else if (typeof data == 'string'){
        dataString = data
      } else {
        console.error(data + '不是一个有效的String/Object')
        return reject()
      }

      if(!empty(this._socket)) {
        // console.log('发送' + dataString)
        this._socket.send({
          data: dataString,
          success() {
            resolve()
          },
          fail() {
            reject()
          }
        })
      } else {
        /// 尝试重连
        this.open().then(() => {
          this._socket.send({
            data: dataString,
            success() {
              resolve()
            },
            fail() {
              reject()
            }
          })
        }).catch(e => {
          console.error(e,'websocket处于关闭状态')
          // reject(e)
        })
       
      }
    })
    
  },

  /// 主动关闭
  close() {
    if(this._socket != null) {
      this._socket.close()
    }
    clearInterval(this._timer)
    this._socket = null
    /// 信息传递监听器
    this._messageListeners =  []
    /// 打开监听器
    this._openListeners =  []
    /// 关闭监听器
    this._closeListeners =  []
  },

  /// 返回信息监听器绑定
  addListener(type = 'message', listener) {
    /// 直接传一个function的话默认为message监听器
    if (typeof type == 'function') {
      /// 不会重复插入同一个监听器
      if (!this._messageListeners.includes(type)) {
        this._messageListeners.push(type)
      }
    } else {
      if (typeof listener != 'function') {
        return console.error(listener + '监听器不是一个有效函数')
      }
      if (!this[`_${type}Listeners`].includes(listener)) {
        this[`_${type}Listeners`].push(listener)
      }
    }
  },

  /// 返回信息监听器移除
  removeListener (type = 'message', listener) {
    /// 直接传一个function的话默认为message监听器
    let index
    if (typeof type == 'function') {
      /// 不会重复插入同一个监听器
      index = this._messageListeners.indexOf(listener)
      if (index > -1) {
        this._messageListeners.splice(index, 1)
      }
    } else {
      if (typeof listener != 'function') {
        return console.error(listener + '监听器不是一个有效函数')
      }
      index = this[`_${type}Listeners`].indexOf(listener)
      if (index > -1) {
        this[`_${type}Listeners`].splice(index, 1)
      }
    }
  }
}