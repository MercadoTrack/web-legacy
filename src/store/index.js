import Vue from 'vue'
import Vuex from 'vuex'
import routeModule from './routeModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    route: routeModule
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
})
