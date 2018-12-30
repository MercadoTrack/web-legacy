import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dash from './views/Dash.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dash',
      name: 'dash',
      component: Dash
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('navigate', to.name)
  next()
})

export default router
