const key = 'HIDDEN_INTRO'

export default {
  namespaced: true,
  state: {
    dismissed: !!localStorage.getItem(key),
  },
  mutations: {
    dismiss (state) {
      localStorage.setItem(key, true)
      state.dismissed = true
    }
  },
  getters: {
    show: (state) => !state.dismissed,
  }
}
