// components/input/index.js
Component({
  options:{
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 大小写
    textTransform: String,
    maxlength: {
      type: Number,
      value: -1
    },
    fixed: {
      type: Boolean,
      value: false,
    },
    type: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    // picker
    range: {
      type: [Array, Object],
      value: []
    },
    rangeKey: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: 'selector'
    },

    focus: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    textareaFocus: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focusTextarea () {
      this.setData({
        textareaFocus: true,
        focus: true
      })
    },
    blurTextarea () {
      this.setData({
        textareaFocus: false
      })
    },
    bindreset () {
      this.setData({
        value: ''
      })
      this.triggerEvent('input', {value: ''})
    },
    bindcolumnchange (e) {
      this.triggerEvent('columnchange', e.detail)
    },
    bindchange (e) {
      this.triggerEvent('change', e.detail)

      let mode = this.data.mode
      let rangeKey = this.data.rangeKey
      let range = this.data.range
      let index = e.detail.value
      let tmpValue
      if (rangeKey) {
        if (mode == 'multiSelector') {
          tmpValue = []
          for (let i in index) {
            tmpValue[i] = range[i][index[i]][rangeKey]
          }
          // this.triggerEvent('valuechange', range[index])
        } else if (mode === 'selector') {
          tmpValue = range[index][rangeKey]
        } else {
          tmpValue = index
        }
      } else {
        if (mode == 'multiSelector') {
          tmpValue = []
          for (let i in index) {
            tmpValue[i] = range[i][index[i]]
          }
          // this.triggerEvent('valuechange', range[index])
        } else if (mode === 'selector') {
          tmpValue = range[index]
        } else {
          tmpValue = index
        }
      }
      
      this.triggerEvent('valuechange', tmpValue)
    },
    bindinput(e) {
      this.setData({
        value: e.detail.value
      })
      this.triggerEvent('input', e.detail)
    },
    bindblur(e) {
      this.triggerEvent('blur', e.detail)
    },
  }
})
