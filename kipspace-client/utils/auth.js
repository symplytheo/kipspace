import Cookie from 'js-cookie'

export const setTokenInCookie = (token, exp) => {
  Cookie.set('kipspace_token', token, { expires: exp || 2 })
}

export const setUserInCookie = (user, exp) => {
  Cookie.set('kipspace_user', user, { expires: exp || 2 })
}

export const getTokenFromCookie = () => {
  // let token = window.localStorage && window.localStorage.getItem('access_token');
  const token = Cookie.get('kipspace_token')
  return token
}

export const getUserFromCookie = () => {
  const user = Cookie.get('kipspace_user')
    ? JSON.parse(Cookie.get('kipspace_user'))
    : null
  if (user) return user
}
