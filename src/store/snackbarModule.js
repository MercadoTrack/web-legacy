const defaultTimeout = 10000

export default {
  namespaced: true,
  state: {
    show: false,
    text: '',
    timeout: defaultTimeout,
    right: true,
    bottom: true,
    left: false,
    top: false,
  },
  mutations: {
    dismiss (state) {
      state.show = false
      state.text = ''
      state.timeout = defaultTimeout
    },
    favoritesDeleted (state, amount) {
      state.show = true
      state.text = amount === 1 ? 'Favorito eliminado' : `${amount} favoritos eliminados`
      state.timeout = defaultTimeout
      state.right = true
      state.bottom = true
      state.left = false
      state.top = false
    },
    articleNotFound (state) {
      state.show = true
      state.text = 'Aun no estamos trackeando este articulo'
      state.timeout = defaultTimeout
      state.right = false
      state.bottom = true
      state.left = false
      state.top = false
    },
    welcome (state, user) {
      state.show = true
      state.text = `Hola ${user.given_name}!`
      state.timeout = defaultTimeout
      state.right = true
      state.bottom = true
      state.left = false
      state.top = false
    }
  },
  getters: {
    show: (state) => state.show,
    text: (state) => state.text,
    timeout: (state) => state.timeout,
    right: (state) => state.right,
    bottom: (state) => state.bottom,
    top: (state) => state.top,
    left: (state) => state.left,
  }
}
