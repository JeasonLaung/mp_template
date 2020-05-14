import Vuex from "./utils/vuex";


export default Vuex.store({
  states: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
    },
    clearUserInfo(state) {
      state.userInfo = {}
    }
  }
})