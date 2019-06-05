export default {
  namespaced: true,
  state: {
    user: null,
    accessToken: '',
  },
  mutations: {
    login (state, { user, accessToken }) {
      state.user = user
      state.accessToken = accessToken
    },
    logout (state) {
      state.user = null
      state.accessToken = ''
    },
    updateUser (state, user) {
      state.user = user
    }
  },
  getters: {
    user: (state) => state.user,
    accessToken: (state) => state.accessToken,
    isAuthenticated: (state) => Boolean(state.user),
  }
}
