import axios from 'axios'
import { getTokens } from './utils/auth'

class Api {
  constructor () {
    this.instance = axios.create({
      baseURL: 'https://api.mercadotrack.com/',
      timeout: 15000
    })

    this.instance.interceptors.request.use(
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
    return this.instance.get(`/articles/${id}`)
  }

  getMlArticle (id) {
    return this.instance.get(`/articles/ml/${id}`)
  }

  getPaginatedArticles (params) {
    return this.instance.get('/articles', { params })
  }

  getMlSeller (id) {
    return axios.get(`https://api.mercadolibre.com/users/${id}`)
  }

  getCategories () {
    return this.instance.get('/categories')
  }

  getFavorites () {
    return this.instance.get('/user/favorites')
  }

  toggleFavorite (articleId) {
    return this.instance.put('/user/favorites', { articleId })
  }

  addFavorites (articleIds) {
    return this.instance.post('/user/favorites', { articleIds })
  }

  removeFavorites (articleIds) {
    return this.instance.delete('/user/favorites', { data: { articleIds } })
  }

  getSyncStatus () {
    return this.instance.get('/sync')
  }
}

export default new Api()
