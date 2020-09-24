export const state = () => ({
  facilities: [],
  dialog: false,
})

export const mutations = {
  setFacilities(state, facilities) {
    state.facilities = facilities
  },
  openDialog(state) {
    state.dialog = true
  },
}
