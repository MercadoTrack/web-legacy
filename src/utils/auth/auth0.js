import { Auth0Lock } from 'auth0-lock'
import { Management } from 'auth0-js'
import qs from 'query-string'
import logo from '../../assets/mtrack_icon.svg'
import { getUser, setToken, unsetToken } from './auth'
import { CLIENT_ID, ROUTES } from './authConstants'
import store from '../../store'
import router from '../../router'

const baseUrl = `${window.location.protocol}//${window.location.host}`
const scope = 'openid profile email read:current_user update:current_user_metadata create:current_user_metadata'
const audience = `https://${ROUTES.DOMAIN}/api/v2/`

const lock = new Auth0Lock(CLIENT_ID, ROUTES.DOMAIN, {
  language: 'es',
  allowShowPassword: true,
  autoclose: true,
  auth: {
    sso: false,
    redirect: false,
    responseType: 'token id_token',
    params: {
      scope,
    }
  },
  languageDictionary: {
    title: 'MercadoTrack'
  },
  theme: {
    logo,
    primaryColor: '#3483FA',
    authButtons: {
      primaryColor: '#3483FA',
      displayName: 'MercadoTrack'
    }
  }
})

export const login = () => lock.show()

export const logout = () => {
  const { path, query } = router.currentRoute
  const logoutRoute = `${baseUrl}${ROUTES.CALLBACK_ROUTE_LOGOUT}`
  if (path === '/') {
    lock.logout({
      returnTo: logoutRoute
    })
  } else {
    let queryStr = qs.stringify(query)
    queryStr = queryStr ? `?${queryStr}` : ''
    lock.logout({
      returnTo: `${logoutRoute}?returnTo=${encodeURIComponent(path + queryStr)}`,
    })
  }
}

export const logoutCallback = (returnTo) => {
  unsetToken()
  store.commit('auth/logout')
  router.push(returnTo || '/')
}

export const initAuth = async () => {
  const authData = await checkSession(lock)
  console.log({ ...authData })
  if (authData) {
    addAuthDataToStore(authData)
  }
  lock.on('authenticated', async () => {
    const authData = await checkSession(lock)
    console.log({ ...authData })
    addAuthDataToStore(authData)
  })
}

const addAuthDataToStore = (authData) => {
  store.commit('auth/login', authData)
  store.commit('snackbar/welcome', authData.user)
}

const checkSession = async (lock) => {
  return new Promise((resolve) => {
    lock.checkSession({
      redirectUri: baseUrl,
      scope,
      audience,
    }, (err, result) => {
      if (err) {
        resolve(null) // always resolving
      } else {
        const { accessToken, idToken } = result
        setToken(accessToken, idToken)
        const idTokenUser = getUser()
        const auth0Manage = new Management({ token: accessToken, domain: ROUTES.DOMAIN })
        auth0Manage.getUser(idTokenUser.sub, (err, user) => {
          resolve({ user: err ? idTokenUser : user, accessToken })
        })
      }
    })
  })
}

export const toggleFavorite = (articleId) => {
  const user = store.getters['auth/user']
  const accessToken = store.getters['auth/accessToken']
  const auth0Manage = new Management({ token: accessToken, domain: ROUTES.DOMAIN })
  return new Promise((resolve, reject) => {
    auth0Manage.getUser(user.user_id, (err, userData) => {
      if (err) reject(err)
      else {
        const meta = Object.assign({}, userData.user_metadata)
        if (!meta.favorites) {
          meta.favorites = [ articleId ]
        } else {
          const filtered = meta.favorites.filter(id => id !== articleId)
          if (filtered.length !== meta.favorites.length) {
            meta.favorites = filtered // toggled!
          } else {
            meta.favorites.push(articleId)
          }
        }
        console.log({ meta })
        auth0Manage.patchUserMetadata(user.user_id, meta, (err, result) => {
          if (err) {
            reject(err)
          } else {
            store.commit('auth/updateUser', result)
            console.log({ result })
            resolve(result)
          }
        })
      }
    })
  })
}
