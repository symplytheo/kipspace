import FacilitiesGql from '~/graphql/queries/facilities'
import CategoriesGql from '~/graphql/queries/categories'

export const actions = {
  async nuxtServerInit({ commit }, context) {
    const client = context.app.apolloProvider.defaultClient
    //
    const category = await client.query({ query: CategoriesGql })
    const facility = await client.query({ query: FacilitiesGql })
    //
    commit('category/setCategories', category.data.categories.items)
    commit('facility/setFacilities', facility.data.facilities.items)
  },
}
