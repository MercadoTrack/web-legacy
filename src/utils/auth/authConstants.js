// https://auth0.com/docs/libraries/error-messages
export const ERRORS = {
  LOGIN_REQUIRED: 'login_required',
  INVALID_PASSWORD: 'invalid_password',
  PASSWORD_DICTIONARY_ERROR: 'password_dictionary_error',
  PASSWORD_NO_USER_INFO_ERROR: 'password_no_user_info_error',
  PASSWORD_STRENGTH_ERROR: 'password_strength_error',
  UNAUTHORIZED: 'unauthorized',
  USER_EXISTS: 'user_exists',
  USERNAME_EXISTS: 'username_exists',
  ACCESS_DENIED: 'access_denied',
  INVALID_USER_PASSWORD: 'invalid_user_password',
  MFA_INVALID_CODE: 'mfa_invalid_code',
  MFA_REGISTRATION_REQUIRED: 'mfa_registration_required',
  MFA_REQUIRED: 'mfa_required',
  PASSWORD_LEAKED: 'password_leaked',
  PASSWORD_HISTORY_ERROR: 'PasswordHistoryError',
  TOO_MANY_ATTEMPTS: 'too_many_attempts',
}

export const CLIENT_ID = 'yoXp0XGCjMyhgwocUGmDtM80osBLnVZw'

export const ROUTES = {
  DOMAIN: 'mercadotrack.auth0.com',
  CALLBACK_ROUTE_ROOT: '/callback', // this should be something that is contained in all the callbacks
  CALLBACK_ROUTE_LOGIN: '/callback/login',
  CALLBACK_ROUTE_LOGOUT: '/callback/logout',
}

export const KEYS = {
  LOCAL_STORAGE_KEY: 'isLoggedIn'
}
