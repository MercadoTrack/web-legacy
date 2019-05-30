import Vue from 'vue'
import Router from 'vue-router'
import Landing from './views/Landing'
import Search from './views/Search'
import Stats from './views/Stats'
import Article from './views/Article'
import Favorites from './views/Favorites'
import Category from './views/Category'
import Seller from './views/Seller'
import Callback from './views/Callback'

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
      path: '/callback/:action',
      name: 'callback',
      component: Callback
    },
    {
      path: '/busqueda',
      name: 'search',
      component: Search,
      // overwrite default transition
      meta: { transition: 'fade-in-left' },
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    },
    {
      path: '/articulo/:id',
      name: 'article',
      component: Article
    },
    {
      path: '/favoritos',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/seller/:id',
      name: 'seller',
      component: Seller,
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
