import { WebAuth } from 'auth0-js'
import { getUser, setToken } from './auth'
import { CLIENT_ID, ROUTES } from './authConstants'
import router from '../../router'

const baseUrl = `${window.location.protocol}//${window.location.host}`

const webAuth = new WebAuth({
  clientID: CLIENT_ID,
  domain: ROUTES.DOMAIN,
  responseType: 'token id_token',
  scope: 'openid profile email',
  redirectUri: baseUrl,
})

const createQuery = (options = {}) => {
  const query = Object.keys(options).reduce((partial, key) => {
    const option = encodeURIComponent(options[key])
    const val = `${key}=${option}`
    return partial ? `${partial}&${val}` : `?${val}`
  }, '')
  return query
}

export const login = (opts = {}) => {
  const { path, query } = router.currentRoute
  return path === '/' ? webLogin() : webLogin(path, { ...query, ...opts })
}

export const logout = (opts = {}) => {
  const { path, query } = router.currentRoute
  return path === '/' ? webLogout() : webLogout(path, { ...query, ...opts })
}

export const checkSession = async () => {
  try {
    const result = await webCheckSession()
    setToken(result.idToken, result.accessToken)
    return getUser()
  } catch (err) {
    // no previous session: failing silently
  }
}

export const parseLoginHash = () => {
  return new Promise((resolve, reject) => {
    webAuth.parseHash((err, result) => {
      if (err) {
        console.log('Something happened with the Sign In request')
        reject(err)
        return
      }
      setToken(result.idToken, result.accessToken)
      resolve(getUser())
    })
  })
}

const webLogin = (url, opts) => {
  const options = createQuery(opts)
  const returnTo = url ? `?returnTo=${encodeURIComponent(url + options)}` : ''
  return new Promise((resolve, reject) => {
    webAuth.authorize({
      redirectUri: `${baseUrl}${ROUTES.CALLBACK_ROUTE_LOGIN}${returnTo}`,
    }, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const webLogout = (url, opts) => {
  const options = createQuery(opts)
  const returnTo = url ? `?returnTo=${encodeURIComponent(url + options)}` : ''
  return new Promise((resolve, reject) => {
    webAuth.logout({
      returnTo: `${baseUrl}${ROUTES.CALLBACK_ROUTE_LOGOUT}${returnTo}`,
    }, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const webCheckSession = () => {
  return new Promise((resolve, reject) => {
    webAuth.checkSession({}, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}
