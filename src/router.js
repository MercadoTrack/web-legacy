import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Browse from './views/Browse.vue'
import Stats from './views/Stats'
import Article from './views/Article'

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
      path: '/navegar',
      name: 'browse',
      component: Browse
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('navigate', to.name)
  next()
})

export default router
