import cookie from "../utils/cookie"
import { SIGNATURE_NAME, SESSION_NAME } from "../config/index"
import { logout as loginout } from "../api/login"
import store from "../store"

export const Global = {
  /// 后台
  isHide: false,
  /// 当前订单id
  orderId: 0,

  logout() {
    return new Promise((resolve, reject) => {
      loginout().then(() => {
        store.commit('clearUserInfo')
        cookie.remove(SIGNATURE_NAME)
        cookie.remove(SESSION_NAME)
        GlobalWebsocket.close()
        resolve()
      }).catch(data => {
        store.commit('clearUserInfo')
        cookie.remove(SIGNATURE_NAME)
        cookie.remove(SESSION_NAME)
        GlobalWebsocket.close()
        resolve()
      })
    })
  }
}