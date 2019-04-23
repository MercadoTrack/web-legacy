import Vue from 'vue'
import Vuex from 'vuex'
import routeModule from './routeModule'
import shareModule from './shareModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    route: routeModule,
    share: shareModule,
  }
})
