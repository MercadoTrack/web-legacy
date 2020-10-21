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
    multiline: false,
  },
  mutations: {
    dismiss (state) {
      state.show = false
      state.text = ''
      state.timeout = defaultTimeout
      state.multiline = false
    },
    favoritesAdded (state, article) {
      state.show = true
      state.text = `Artículo agregado a favoritos 🎉`
      state.timeout = defaultTimeout
      state.right = true
      state.bottom = true
      state.left = false
      state.top = false
      state.multiline = false
    },
    favoritesDeleted (state, amount) {
      state.show = true
      state.text =
        amount === 1 ? 'Favorito eliminado' : `${amount} favoritos eliminados`
      state.timeout = defaultTimeout
      state.right = true
      state.bottom = true
      state.left = false
      state.top = false
      state.multiline = false
    },
    articleNotFound (state) {
      state.show = true
      state.text = 'Hubo un problema con este artículo'
      state.timeout = defaultTimeout
      state.right = false
      state.bottom = true
      state.left = false
      state.top = false
      state.multiline = false
    },
    welcome (state, user) {
      state.show = true
      state.text = `¡Hola ${user.given_name || user.email}!`
      state.timeout = defaultTimeout
      state.right = true
      state.bottom = true
      state.left = false
      state.top = false
      state.multiline = false
    },
    nonSupportedProduct (state) {
      state.show = true
      state.text =
        'No soportamos este tipo de articulos (todavia) ya que son productos y no publicaciones normales de MercadoLibre — Proba con otra busqueda'
      state.timeout = defaultTimeout
      state.bottom = true
      state.right = false
      state.left = false
      state.multiline = true
    },
    invalidSearch (state) {
      state.show = true
      state.text =
        'Hubo un problema con la busqueda — Proba con otro link o contactate con nosotros a traves de redes sociales'
      state.timeout = defaultTimeout
      state.bottom = true
      state.right = false
      state.left = false
      state.multiline = true
    },
  },
  getters: {
    show: (state) => state.show,
    text: (state) => state.text,
    timeout: (state) => state.timeout,
    right: (state) => state.right,
    bottom: (state) => state.bottom,
    top: (state) => state.top,
    left: (state) => state.left,
    multiline: (state) => state.multiline,
  },
}
