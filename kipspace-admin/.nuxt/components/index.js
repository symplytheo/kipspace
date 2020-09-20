export { default as FacilityCard } from '../..\\components\\FacilityCard.vue'
export { default as Snackbar } from '../..\\components\\Snackbar.vue'

export const LazyFacilityCard = import('../..\\components\\FacilityCard.vue' /* webpackChunkName: "components_FacilityCard" */).then(c => c.default || c)
export const LazySnackbar = import('../..\\components\\Snackbar.vue' /* webpackChunkName: "components_Snackbar" */).then(c => c.default || c)
