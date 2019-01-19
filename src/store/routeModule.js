export default {
  state: {
    route: ''
  },
  mutations: {
    navigate: (state, route) => {
      state.route = route
    }
  },
  getters: {
    isHome: (state) => state.route === 'home'
  }
}
