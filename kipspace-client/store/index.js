// logged-in user not showing on page refresh
import ProfileGql from '~/graphql/queries/profile'

export const actions = {
  async nuxtServerInit({ commit }, context) {
    const client = context.app.apolloProvider.defaultClient
    const hasToken = !!context.app.$apolloHelpers.getToken()
    //
    if (hasToken) {
      const userData = await client.query({ query: ProfileGql })
      commit('user/setUser', userData.data.profile)
    }
  },
}
