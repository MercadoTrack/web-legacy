const key = 'wizard-seen-first-time'

export default {
  namespaced: true,
  state: {
    hide: Boolean(localStorage.getItem(key)),
  },
  mutations: {
    hide: (state) => {
      state.hide = true
      localStorage.setItem(key, true)
    },
    show: (state) => {
      state.hide = false
    }
  },
  getters: {
    show: ({ hide }) => !hide,
    hide: ({ hide }) => hide
  }
}
