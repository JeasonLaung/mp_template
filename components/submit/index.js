// components/submit/index.js
import { $collect } from '../../mixins/index.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    disabled: {
      type: Boolean,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    // 占高
    placeHeight: {
      type: String,
      value: ''
    }
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
    $collect,
    handleTap () {
      this.triggerEvent('click')
    }
  }
})
