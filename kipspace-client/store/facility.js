export const state = () => ({
  facilities: [],
})

export const mutations = {
  setFacilities(state, facilities) {
    state.facilities = facilities
  },
}
