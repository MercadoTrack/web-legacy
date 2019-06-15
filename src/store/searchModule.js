import api from '../api'

const limit = 30
const generateParams = (query) => ({
  ...query,
  limit,
  page: query.page || 1,
  skip: query.page ? (query.page - 1) * limit : 0,
  pretty: true,
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
    async paginate ({ commit, state }, query) {
      if (state.loading) return
      commit('loading')
      const params = generateParams(query)
      try {
        const { data } = await api.getPaginatedArticles(params)
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
