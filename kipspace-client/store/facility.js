export const state = () => ({
  facilities: [],
})

export const getters = {
  facilities: (state) => {
    state.facilities.map((facility) => {
      facility.slug = facility.text
        .replace(/(\s&\s)|\s|(,\s)/g, '-')
        .toLowerCase()
    })
    return state.facilities
  },
}

export const mutations = {
  setFacilities(state, facilities) {
    state.facilities = facilities
  },
}
