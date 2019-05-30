import { WebAuth } from 'auth0-js'
import { CLIENT_ID, ROUTES } from './authConstants'

const baseUrl = `${window.location.protocol}//${window.location.host}`

const webAuth = new WebAuth({
  clientID: CLIENT_ID,
  domain: ROUTES.DOMAIN,
})

export const authorize = (url, opts) => {
  const options = createQuery(opts)
  const returnTo = url ? `?returnTo=${encodeURIComponent(url + options)}` : ''
  return webAuth.authorize({
    responseType: 'token id_token',
    redirectUri: `${baseUrl}${ROUTES.CALLBACK_ROUTE_LOGIN}${returnTo}`,
    scope: 'openid profile email',
  })
}

export const logout = (url, opts) => {
  const options = createQuery(opts)
  const returnTo = url ? `?returnTo=${encodeURIComponent(url + options)}` : ''
  return webAuth.logout({
    returnTo: `${baseUrl}${ROUTES.CALLBACK_ROUTE_LOGOUT}${returnTo}`,
  })
}

const createQuery = (options = {}) => {
  const query = Object.keys(options).reduce((partial, key) => {
    const option = encodeURIComponent(options[key])
    const val = `${key}=${option}`
    return partial ? `${partial}&${val}` : `?${val}`
  }, '')
  return query
}

export const parseHash = callback => webAuth.parseHash(callback)
