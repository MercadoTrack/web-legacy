import http from '../http.js'

export default {
  namespaced: true,
  state: {
    categories: {
      count: null,
      main: [],
      child: []
    }
  },
  mutations: {
    setCategories: (state, { count, categories }) => {
      state.categories = {
        count,
        main: categories.filter(({ parent }) => !parent),
        child: categories.filter(({ parent }) => Boolean(parent))
      }
    }
  },
  actions: {
    getBase ({ dispatch }) {
      dispatch('getCategories')
    },
    getCategories ({ commit }) {
      http.get('categories').then(({ data }) => {
        commit('setCategories', data)
      }).catch((getCategoriesMetaErr) => {
        console.warn({ getCategoriesMetaErr })
      })
    }
  },
  getters: {
    categories: (state) => [...state.categories.main, ...state.categories.child],
    mainCategories: (state) => state.categories.main,
    childCategories: (state) => state.categories.child,
  }
}
