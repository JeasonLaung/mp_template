const CONFIG_NAME = 'pt_user_config'
export default {
  set(name, value) {
    return wx.setStorageSync(name, value)
  },
  get(name) {
    return wx.getStorageSync(name)
  },
  clear() {
    return wx.clearStorageSync()
  },
  remove(name) {
    return wx.removeStorageSync(name)
  },
  setConfig(name, value) {
    let config = this.get(CONFIG_NAME) || {}
    config[name] = value
    return wx.setStorageSync(CONFIG_NAME, config)
  },
  getConfig(name) {
    let config = wx.getStorageSync(CONFIG_NAME)
    return config && config[name] ? config[name] : ''
  }
}
