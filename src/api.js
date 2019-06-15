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
    this.instance.get('/articles', { params })
  }

  getMlSeller (id) {
    return axios.get(`https://api.mercadolibre.com/users/${id}`)
  }

  getCategories () {
    return this.instance.get('/categories')
  }

  toggleFavorite (articleId) {
    return this.instance({
      method: `POST`,
      url: `/user/favorites`,
      data: { articleId },
    })
  }

  getSyncStatus () {
    return this.instance.get('/sync')
  }
}

export default new Api()
