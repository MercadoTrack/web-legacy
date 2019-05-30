import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

export const getUser = () => {
  return Cookie.getJSON('user')
}

export const unsetToken = () => {
  Cookie.remove('idToken')
  Cookie.remove('accessToken')
  Cookie.remove('user')
}

export const setToken = (idToken, accessToken) => {
  Cookie.set('user', jwtDecode(idToken))
  Cookie.set('idToken', idToken)
  Cookie.set('accessToken', accessToken)
}

export const isLoggedIn = () => !!getUser()
