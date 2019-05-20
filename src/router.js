import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Landing from './views/Landing'
import Search from './views/Search'
import Stats from './views/Stats'
import Article from './views/Article'
import Favorites from './views/Favorites'
import Category from './views/Category'

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
      path: '/busqueda',
      name: 'search',
      component: Search,
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
      path: '/:category',
      name: 'category',
      component: Category,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
