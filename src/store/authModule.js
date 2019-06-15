export default {
  namespaced: true,
  state: {
    user: null,
    favorites: [],
  },
  mutations: {
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
    isAuthenticated: (state) => Boolean(state.user),
  }
}
