import ProfileGql from '~/graphql/queries/profile'

export default async ({ app, redirect, route, store }) => {
  //
  const hasToken = await !!app.$apolloHelpers.getToken()
  if (hasToken) {
    const userData = await app.apolloProvider.defaultClient.query({
      query: ProfileGql,
    })

    const user = await userData.data.profile

    if (user.role === 'ADMIN') {
      store.commit('user/setUser', user)
      //
    } else {
      return redirect('/account/login')
    }
    //
  } else {
    return redirect('/account/login')
  }
}
