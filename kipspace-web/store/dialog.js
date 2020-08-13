export const state = () => ({
  login: false,
  register: false
})

export const mutations = {
  openLogin(state) {
    state.login = !state.login;
  },
  closeLogin(state) {
    state.login = false;
  },
  openRegister(state) {
    state.register = !state.register;
  },
  closeRegister(state) {
    state.register = false;
  },
}