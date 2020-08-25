import axios from 'axios'
import { getTokens } from './utils/auth'
import store from './store'

const baseConfig = Object.freeze({
  // baseURL: 'https://api.mercadotrack.com/',
  baseURL: 'http://localhost:8088/',
  timeout: 20000
})

class Api {
  constructor () {
    this.base = axios.create(baseConfig)

    this.withAuth = axios.create(baseConfig)
    this.withAuth.interceptors.request.use(
      (config) => {
        const { idToken } = getTokens()
        if (idToken) {
          config.headers.Authorization = `Bearer ${idToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
  }

  getArticle (id) {
    return this.base.get(`/articles/${id}`)
  }

  followArticle (id) {
    return this.withAuth.post('/articles/follow', { id })
      .then((res) => {
        const { user } = store.state.auth
        ga('send', {
          hitType: 'event',
          eventCategory: 'Article',
          eventAction: 'follow',
          eventLabel: user.email,
        })
        return res
      })
  }

  async getOrFollowArticle (id) {
    try {
      const article = await this.getArticle(id)
      return article
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return this.followArticle(id).then(res => ({ ...res, justFollowed: true }))
      }
      throw err
    }
  }

  getMlArticle (id) {
    return this.base.get(`/articles/ml/${id}`)
  }

  getPaginatedArticles (params) {
    return this.base.get('/articles', { params })
  }

  getMlSeller (id) {
    return axios.get(`https://api.mercadolibre.com/users/${id}`)
  }

  getCategories () {
    return this.base.get('/categories')
  }

  getSaleEvents () {
    return this.base.get('/sales')
  }

  getFavorites (params = {}) {
    return this.withAuth.get('/user/favorites', { params })
  }

  toggleFavorite (articleId) {
    return this.withAuth.put('/user/favorites', { articleId })
  }

  addFavorites (articleIds) {
    return this.withAuth.post('/user/favorites', { articleIds })
  }

  removeFavorites (articleIds) {
    return this.withAuth.delete('/user/favorites', { data: { articleIds } })
      .then(res => {
        articleIds.forEach(id => {
          ga('send', {
            hitType: 'event',
            eventCategory: 'Favorites',
            eventAction: 'remove',
            eventLabel: id,
          })
        })
        return res
      })
  }

  getSyncStatus () {
    return this.base.get('/sync')
  }
}

export default new Api()
