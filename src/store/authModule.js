export default {
  namespaced: true,
  state: {
    authenticating: false,
    user: null,
    favorites: [],
  },
  mutations: {
    started (state) { // these are for when accessing directly to a page that needs auth, e.g. /favorites
      state.authenticating = true
    },
    finished (state) {
      state.authenticating = false
    },
    login (state, user) {
      state.user = user
    },
    logout (state) {
      state.user = null
      state.favorites = []
    },
    updateFavorites (state, favorites) {
      state.favorites = favorites
    }
  },
  getters: {
    user: (state) => state.user,
    favorites: (state) => state.favorites,
    authenticating: (state) => state.authenticating,
    isAuthenticated: (state) => Boolean(state.user),
  }
}
