import methods from '../mixins/index'
import store from '../store'
let count = 0 
function SPage (config) {
  console.log('create a Page, count:' + (count++))
  let data = typeof config['data'] == 'object' ? config['data'] : {}
  let page
  page =  Page({
    ...methods,
    ...config,
    data: {
      ...store.state,
      ...data
    },
    onShow() {
      /// 展示的时候绑定本页面为store对象页面
      store.bind(this)
      /// 渲染
      store.render()

      if(typeof config['onShow'] == 'function') {
        config['onShow']()
      }
    }
  })

  return page;
}


module.exports.SPage = SPage