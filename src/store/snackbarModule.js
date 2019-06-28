const defaultTimeout = 5000

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
    favoritesDeleted (state, amount) {
      state.show = true
      state.text = amount === 1 ? 'Favorito eliminado' : `${amount} favoritos eliminados`
      state.timeout = defaultTimeout
    },
    articleNotFound (state) {
      state.show = true
      state.text = 'Aun no estamos trackeando este articulo'
      state.timeout = defaultTimeout
    },
    welcome (state, user) {
      state.show = true
      state.text = `Hola ${user.given_name}!`
      state.timeout = defaultTimeout
    }
  },
  getters: {
    show: (state) => state.show,
    text: (state) => state.text,
    timeout: (state) => state.timeout,
  }
}
