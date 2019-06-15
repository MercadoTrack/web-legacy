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
    }
  },
  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => Boolean(state.user),
  }
}
