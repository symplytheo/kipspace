export const state = () => ({
  categories: require('@/data/categories.json'),
})

export const getters = {
  categories: state => {
    for (const category of state.categories){
      if(!category.slug){
        category.slug = category.text.replace(/(\s\&\s)|\s|(\,\s)/g, '-').toLowerCase();
      } else {
        category.slug = category.slug.toLowerCase();
      }
    }
    return state.categories
  }
}