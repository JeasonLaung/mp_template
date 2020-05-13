// const cloneObj = (obj) => {
//   try{
//     return JSON.parse(JSON.stringify(obj))
//   } catch(e) {
//     console.error(obj + '不是一个有效对象')
//   }
// }
const Vuex = {
  states: null,
  _states: {},
  mutations: {},
  _obj: null,
  /// 准备渲染的对象
  _renderObj: {},
  /// 绑定对象
  bind(obj) {
    this._obj = obj
  },
  /// 重新渲染
  render() {
    this._obj.setData({
      ...this._renderObj
    })
  },
  /// 触发
  commit (func, data) {
    if (typeof this.mutations[func] == 'function') {
      this.mutations[func](this.states, data)
      this.render()
    } else {
      console.error(`全局函数找不到${func}`)
    }
    
  },
  store({states, mutations}) {
    this.mutations = mutations
    this._states = states
    let _this = this
    this.states = new Proxy(this._states, {
      get (target, key) {
        return target[key]
      },
      set (target, key, value) {
        const res = Reflect.set(target, key, value)
        _this._renderObj[key] = value
        if(_this._obj == null) {
          console.log('未传入本页面的对象，或没有调用Vue对Page进行渲染')
          _this._obj.setData({
            [key]: value
          })
        }
        return res
      },
      deleteProperty(target, key) {
        if (target[key]) {
          Reflect.deleteProperty(target, key)
          delete _renderObj[key]
        }
      }
    })
    return this
  }
}

export default Vuex