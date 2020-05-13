import Vuex from "./utils/vuex";


export default Vuex.store({
  states: {
    TEXT: '12346789'
  },
  mutations: {
    setText (states, val) {
      states.TEXT = val
    }
  }
})