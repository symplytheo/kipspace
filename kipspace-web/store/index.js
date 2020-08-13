export const state = () => ({
  isLoggedIn: true,
  links: [
    { text: 'Home', href: '/'},
    { text: 'My Reservations', href: '/reservations'},
    { text: 'Scan to Exit', href: '/exit'} 
  ],
})

export const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn;
  },
  links(state) {
    return state.links;
  }
}

export const mutations = {
  signOut (state) {
    state.isLoggedIn = false;
  },
}