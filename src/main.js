import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

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
