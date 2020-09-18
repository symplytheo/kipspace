import ProfileGql from '~/graphql/queries/profile'

export default async ({ app, redirect, route, store }) => {
  //
  const hasToken = !!app.$apolloHelpers.getToken()
  const userData = await app.apolloProvider.defaultClient.query({
    query: ProfileGql,
  })

  const user = await userData.data.profile
  //
  if (hasToken && user.role === 'ADMIN') {
    store.commit('user/setUser', user)
  } else {
    return redirect(`/account/login?redirect=${route.path}`)
  }
}
