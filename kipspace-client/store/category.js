export const state = () => ({
  categories: [],
})

export const getters = {
  categories: (state) => {
    state.categories.map((category) => {
      category.slug = category.text
        .replace(/(\s&\s)|\s|(,\s)/g, '-')
        .toLowerCase()
    })
    return state.categories
  },
}

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
}
