import router from '../router'
import http from '../http'

const limit = 30
const generateRouteObject = (page, searchTerm) => {
  const query = Object.assign({}, router.currentRoute.query)
  if (page) query.page = page
  if (searchTerm) query.q = searchTerm
  else if (query.q) delete query.q // resetting search!
  return {
    query,
    name: 'search',
  }
}
const generateSearchQuery = (page) => ({
  ...router.currentRoute.query,
  limit,
  page,
  skip: (page - 1) * limit,
  pretty: true,
  // `q` is an arbitrary name set from the ToolBar search
  // maybe change from the backend someday?
  search: router.currentRoute.query.q,
})

export default {
  namespaced: true,
  state: {
    loading: false,
    result: null,
    error: null,
  },
  mutations: {
    loading: (state) => {
      state.error = null
      state.loading = true
      state.result = null
    },
    success: (state, result) => {
      state.error = null
      state.loading = false
      state.result = result
    },
    fail: (state, error) => {
      state.loading = true
      state.result = null
      state.error = error
    },
    reset: (state) => {
      state.loading = false
      state.result = null
      state.error = null
    },
  },
  actions: {
    global ({ dispatch }, searchTerm) {
      if (!searchTerm && !router.currentRoute.query.category) {
        router.push({ name: 'landing' })
      } else {
        dispatch('paginate', { searchTerm })
      }
    },
    // searchTerm is only for search from toolbar, otherwise we take the query param `q`
    async paginate ({ commit, state }, { page = 1, searchTerm }) {
      const route = generateRouteObject(page, searchTerm)
      router.push(route)
      if (state.loading) return
      commit('loading')
      const params = generateSearchQuery(page)
      try {
        const { data } = await http.get('articles', { params })
        commit('success', data)
      } catch (error) {
        commit('fail', error)
      }
    }
  },
  getters: {
    totalPages: (state) => state.result && ~~(state.result.total / limit),
    truncatedTotalPages: (state, getters) => {
      if (!state.result) return
      const currentPage = ~~(state.result.skip / limit)
      const truncatedTotalPages = currentPage + 9
      return Math.min(truncatedTotalPages, getters.totalPages)
    },
    loading: (state) => state.loading,
    result: (state) => state.result,
    error: (state) => state.error,
  }
}
