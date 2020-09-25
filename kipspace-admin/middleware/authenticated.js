import ProfileGql from '~/graphql/queries/profile'

export default async ({ app, redirect, route, store }) => {
  try {
    const hasToken = !!app.$apolloHelpers.getToken()
    if (hasToken) {
      const userData = await app.apolloProvider.defaultClient.query({
        query: ProfileGql,
      })

      const user = await userData.data.profile

      if (user.role === 'ADMIN') {
        store.commit('user/setUser', user)
      } else {
        // TODO: load access denied error page instead
        return redirect('/account/login')
      }
    } else {
      return redirect('/account/login')
    }
  } catch (error) {
    return redirect('/account/login')
  }
}
