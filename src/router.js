import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Landing from './views/Landing'
import Stats from './views/Stats'
import Article from './views/Article'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('navigate', to.name)
  next()
})

export default router
