const defaultTimeout = 4000

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
      state.text = 'ArticleNotFound Message'
      state.timeout = defaultTimeout
    }
  },
  getters: {
    show: (state) => state.show,
    text: (state) => state.text,
    timeout: (state) => state.timeout,
  }
}
