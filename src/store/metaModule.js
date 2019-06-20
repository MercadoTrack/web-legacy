import api from '../api'

export default {
  namespaced: true,
  state: {
    isLoading: true,
    categories: {
      count: null,
      main: [],
      child: []
    }
  },
  mutations: {
    setCategories: (state, { count, main, child }) => {
      state.categories = { count, main, child }
    },
    loading: (state) => {
      state.isLoading = true
    },
    loaded: (state) => {
      state.isLoading = false
    }
  },
  actions: {
    getBase ({ dispatch }) {
      dispatch('getCategories')
    },
    async getCategories ({ commit }) {
      commit('loading')
      try {
        const { data } = await api.getCategories()
        const payload = {
          count: data.count,
          child: data.categories.filter((category) => Boolean(category.parent)),
          main: data.categories.filter((category) => !category.parent),
        }
        commit('setCategories', payload)
      } catch (categoriesMetaError) {
        console.warn({ categoriesMetaError })
      }
      commit('loaded')
    }
  },
  getters: {
    categories: (state) => [...state.categories.main, ...state.categories.child],
    mainCategories: (state) => state.categories.main,
    childCategories: (state) => state.categories.child,
    isLoading: (state) => state.isLoading,
  }
}
