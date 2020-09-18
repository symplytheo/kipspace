import CategoriesGql from '~/graphql/queries/categories'
import ProfileGql from '~/graphql/queries/profile'

export const actions = {
  async nuxtServerInit({ commit }, context) {
    const client = context.app.apolloProvider.defaultClient
    //
    const category = await client.query({ query: CategoriesGql })
    // logged in user not showing on page refresh
    const hasToken = !!context.app.$apolloHelpers.getToken()

    const userData = await client.query({ query: ProfileGql })
    await console.log(userData)
    //
    if (hasToken) {
      commit('user/setUser', userData.data.profile)
    } else {
      return
    }
    //
    commit('category/setCategories', category.data.categories)
  },
}
