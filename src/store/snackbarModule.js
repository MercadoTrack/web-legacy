const defaultTimeout = 3000

export default {
  namespaced: true,
  state: {
    show: false,
    text: '',
    timeout: defaultTimeout
  },
  mutations: {
    dismiss (state) {
      state.show = false
      state.text = ''
      state.timeout = defaultTimeout
    },
    articleNotFound (state) {
      state.show = true
      state.text = 'Aun no estamos trackeando este articulo'
      state.timeout = defaultTimeout
    }
  },
  getters: {
    show: (state) => state.show,
    text: (state) => state.text,
    timeout: (state) => state.timeout,
  }
}
