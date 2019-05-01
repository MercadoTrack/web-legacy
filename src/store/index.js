import Vue from 'vue'
import Vuex from 'vuex'
import routeModule from './routeModule'
import shareModule from './shareModule'
import metaModule from './metaModule'
import introModule from './introModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    route: routeModule,
    share: shareModule,
    meta: metaModule,
    intro: introModule,
  }
})
