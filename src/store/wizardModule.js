const key = 'wizard'

export default {
  namespaced: true,
  state: {
    hide: Boolean(localStorage.getItem(key)),
    seeLater: false,
  },
  mutations: {
    hide: (state) => {
      state.hide = true
      state.seeLater = false
      localStorage.setItem(key, true)
    },
    show: (state) => {
      state.hide = false
      state.seeLater = true
      localStorage.removeItem(key)
    },
    seeLater: (state) => {
      state.hide = true
      state.seeLater = true
    }
  },
  getters: {
    show: (state) => !state.hide,
    seeLater: (state) => state.seeLater,
  }
}
