import { setUserInCookie } from '~/utils/auth'

export const state = () => ({
  authenticated: false,
  profile: {},
  users: [],
})

export const mutations = {
  setUser(state, user) {
    state.profile = user || null
    state.authenticated = !!user
  },
  setAllUsers(state, payload) {
    state.users = payload
  },
}

export const actions = {
  setUser: ({ commit }, { user }) => {
    setUserInCookie(user)
    commit('setUser', user || null)
  },
  logout: ({ commit }, { $apollo, $router }) => {
    return $apollo.onLogout().then(() => {
      commit('setUser', null)
      $router.replace('/account/login')
    })
  },
}
