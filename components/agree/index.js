// components/agree/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: true
    },
    one: {
      type: Object,
      value: {}
    },
    cancelText: String,
    confirmText: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _copy () {
      let _this = this
      wx.showModal({
        title: '是否复制条款?',
        success ({confirm}) {
          if (confirm) {
            wx.setClipboardData({
              data: _this.data.one.content || '',
              success () {
                wx.showToast({
                  title: '复制成功',
                })
              }
            })
          }
        }
      })
    },
    _close () {
      this.triggerEvent('close')
    },
    _confirm() {
      this.triggerEvent('close')
      this.triggerEvent('confirm', this.data.one)
    },
    _cancel() {
      this.triggerEvent('close')
      this.triggerEvent('cancel', this.data.one)
    },
  }
})
