import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Landing from './views/Landing'
import Search from './views/Search'
import Stats from './views/Stats'
import Article from './views/Article'
import Favorites from './views/Favorites'

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
      path: '/busqueda/:category_id?', // TODO: check the best url for category links
      name: 'search',
      component: Search
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
      path: '/favorites',
      name: 'favorites',
      component: Favorites
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
