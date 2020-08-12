export const state = () => ({
  isLoggedIn: true
})

export const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn;
  }
}

export const mutations = {
  signOut (state) {
    state.isLoggedIn = false;
  },
}