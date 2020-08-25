import api from '../api'

export default {
  namespaced: true,
  state: {
    isLoading: true,
    saleEvents: null,
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
    setSaleEvents: (state, sales) => {
      state.saleEvents = sales
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
      dispatch('getSaleEvents')
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
    },
    async getSaleEvents ({ commit }) {
      try {
        const { data } = await api.getSaleEvents()
        commit('setSaleEvents', data)
      } catch (salesMetaError) {
        console.warn({ salesMetaError })
      }
    }
  },
  getters: {
    categories: (state) => [...state.categories.main, ...state.categories.child],
    mainCategories: (state) => state.categories.main,
    childCategories: (state) => state.categories.child,
    isLoading: (state) => state.isLoading,
    saleEvents: (state) => state.saleEvents,
  }
}
