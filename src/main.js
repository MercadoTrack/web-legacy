import Vue from 'vue'
import VuePageTransition from 'vue-page-transition'
import VueAnalytics from 'vue-analytics'
import VueMeta from 'vue-meta'
import { sync } from 'vuex-router-sync'
import Chart from 'chart.js'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Chart.defaults.global.defaultFontFamily = 'Roboto'

sync(store, router)

Vue.use(VuePageTransition)
Vue.use(VueMeta)

Vue.filter('priceFilter', (num) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format((+num).toFixed(0))
})

// https://matteogabriele.gitbooks.io/vue-analytics/
Vue.use(VueAnalytics, {
  id: 'UA-139863121-1',
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV !== 'development'
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
