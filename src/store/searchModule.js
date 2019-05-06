import router from '../router'
import http from '../http'

const limit = 30
const generateRouteObject = (q, page) => {
  const name = 'search'
  const query = { page }
  if (!q) {
    return { name, query }
  }
  return {
    name,
    query: Object.assign(query, { q }),
  }
}

export default {
  namespaced: true,
  state: {
    loading: false,
    result: null,
    error: null,
    filters: {
      query: null,
      // the rest of the filters will be here
      // or maybe just in the route?
    }
  },
  mutations: {
    setQuery: (state, query) => {
      state.filters.query = query
    },
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
      state.filters = {
        query: null,
        // ...
      }
    },
  },
  actions: {
    global ({ commit, dispatch }, query) {
      commit('setQuery', query)
      dispatch('paginate')
    },
    async paginate ({ commit, state }, pageNumber = 1) {
      const route = generateRouteObject(state.filters.query, pageNumber)
      router.push(route)
      if (state.loading) return
      commit('loading')
      const params = {
        limit,
        search: state.filters.query,
        skip: (pageNumber - 1) * limit
      }
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
    filters: (state) => state.filters,
  }
}
