import {
  parseHash,
  setToken,
  unsetToken,
  getUser,
  authorize,
  logout,
} from '../utils/auth'
import router from '../router'

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    login (state, user) {
      state.user = user
    },
    logout (state) {
      state.user = null
    }
  },
  actions: {
    init ({ commit }) {
      const user = getUser()
      if (user) {
        commit('login', user)
      }
    },
    login (_, opts = {}) {
      const { path, query } = router.currentRoute
      return path === '/' ? authorize() : authorize(path, { ...query, ...opts })
    },
    logout (_, opts = {}) {
      const { path, query } = router.currentRoute
      return path === '/' ? logout() : logout(path, { ...query, ...opts })
    },
    parseLogin ({ commit }) {
      return new Promise((resolve, reject) => {
        parseHash((err, result) => {
          if (err) {
            reject(new Error('Something happened with the Sign In request'))
            return
          }
          setToken(result.idToken, result.accessToken)
          const user = getUser()
          commit('login', user)
          resolve(user)
        })
      })
    },
    parseLogout ({ commit }) {
      unsetToken()
      commit('logout')
    }
  },
  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => Boolean(state.user),
  }
}
