export default ({ app, redirect, route }) => {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    return redirect(`/account/login?redirect=${route.path}`)
  }
}
