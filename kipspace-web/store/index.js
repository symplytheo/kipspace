export const state = () => ({
  categories: require('@/data/categories.json'),
  isLoggedIn: false,
  loginDialog: false,
  regDialog: false
})

export const getters = {
  categories: state => {
    for (const category of state.categories){
      if(!category.slug){
        category.slug = category.text.replace(/(\s\&\s)|\s|(\,\s)/g, '-').toLowerCase()
      } else {
        category.slug = category.slug.toLowerCase()
      }
    }
    return state.categories
  }
}

export const mutations = {
  openLoginDialog: state => (state.loginDialog = !state.loginDialog),
  closeLoginDialog (state) {
    return  state.loginDialog = false
  },
  openRegDialog: state => (state.regDialog = !state.regDialog),
  closeRegDialog (state) {
    return  state.regDialog = false
  },
}