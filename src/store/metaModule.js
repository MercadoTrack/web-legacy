import http from '../http.js'

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
    getCategories ({ commit }) {
      commit('loading')
      http.get('categories').then(async ({ data }) => {
        const dataWithSamples = {
          count: data.count,
          child: data.categories.filter(({ parent }) => !!parent),
          main: await getMainCategoriesWithSamples(data.categories),
        }
        commit('setCategories', dataWithSamples)
        commit('loaded')
      }).catch((getCategoriesMetaErr) => {
        console.warn({ getCategoriesMetaErr })
        commit('loaded')
      })
    }
  },
  getters: {
    categories: (state) => [...state.categories.main, ...state.categories.child],
    mainCategories: (state) => state.categories.main,
    childCategories: (state) => state.categories.child,
    isLoading: (state) => state.isLoading,
  }
}

async function getMainCategoriesWithSamples (categories) {
  const mainCategories = categories.filter(({ parent }) => !parent)
  const mainCategoriesWithSamples = await Promise.all(
    mainCategories.map(async (category) => {
      try {
        const samplesData = await http.get(`/articles?limit=4&skip=0&category=${category._id}&pretty=true`)
        return { ...category, samples: samplesData.data.page }
      } catch (err) {
        return category
      }
    })
  )
  return mainCategoriesWithSamples
}
