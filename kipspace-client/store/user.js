import { setUserInCookie } from '~/utils/auth'

export const state = () => ({
  authenticated: false,
  profile: {},
})

export const mutations = {
  setUser(state, user) {
    state.profile = user || null
    state.authenticated = !!user
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
