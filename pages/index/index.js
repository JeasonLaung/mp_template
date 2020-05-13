//index.js
//获取应用实例
import {SPage} from '../../utils/spage'
import store from '../../store'
SPage({
  data: {
    text: ''
  },
  onShow() {
    console.log('onshow')
  },
  onLoad() {
    console.log('onload')
  },
  bindinput(e) {
    this.setData({
      text: e.detail.value
    })
    store.commit('setText', e.detail.value)
  }
})