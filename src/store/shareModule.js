export default {
  namespaced: true,
  state: {
    article: null
  },
  mutations: {
    setArticle: (state, article) => {
      state.article = article
    }
  }
}
