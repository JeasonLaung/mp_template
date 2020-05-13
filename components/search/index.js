import {$collect, $go} from '../../mixins/index'
Component({
    externalClasses: ['i-class'],
    properties : {
        /// 搜素种类
        type: {
            type: String,
            value: 'home'
        },
        isInput: {
            type: Boolean,
            value: false
        },
        placeholder: {
            type: String,
            value: "请输入搜索内容"
        },
        value: {
          type: String,
          value: ""
        },
        fixed: {
          type: Boolean,
          value: false
        }
    },

    data: {
        _value: ""
    },
    methods: {
        $collect,
        navigateTo() {
            $go(`/pages/search/index?type=${this.data.type}`)
        },
        bindtap() {
          this.triggerEvent('search', this.data._value)
        },
        bindinput(e) {
          this.setData({
            _value: e.detail.value
          })
          this.triggerEvent('input', this.data._value)
        },
        bindconfirm() {
          this.triggerEvent('confirm', this.data._value)          
        },
        bindblur() {
          this.triggerEvent('blur', this.data._value)          
        },
        bindkeyboardheightchange() {
          this.triggerEvent('keyboardheightchange', this.data._value)          
        }
    },
    /**
     * 挂载事件
     */
    attached () {
      let _this = this
      this.setData({
        _value: _this.data.value
      })
    },
})