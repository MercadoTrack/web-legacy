import Vue from 'vue'
import Vuex from 'vuex'
import routeModule from './routeModule'
import shareModule from './shareModule'
import metaModule from './metaModule'
import introModule from './introModule'
import searchModule from './searchModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    route: routeModule,
    share: shareModule,
    meta: metaModule,
    intro: introModule,
    search: searchModule,
  }
})
