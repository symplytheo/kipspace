import FacilitiesGql from '~/graphql/queries/facilities'
import CategoriesGql from '~/graphql/queries/categories'
import UsersGql from '~/graphql/queries/users'

export const actions = {
  async nuxtServerInit({ commit }, context) {
    const client = context.app.apolloProvider.defaultClient
    //
    const category = await client.query({ query: CategoriesGql })
    const facility = await client.query({ query: FacilitiesGql })
    const user = await client.query({ query: UsersGql })
    //
    commit('category/setCategories', category.data.categories)
    commit('facility/setFacilities', facility.data.facilities)
    commit('user/setAllUsers', user.data.users)
  },
}
