import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _639ce932 = () => interopDefault(import('..\\pages\\exit.vue' /* webpackChunkName: "pages_exit" */))
const _04e9f7b6 = () => interopDefault(import('..\\pages\\make-reservation.vue' /* webpackChunkName: "pages_make-reservation" */))
const _633ea822 = () => interopDefault(import('..\\pages\\notifications.vue' /* webpackChunkName: "pages_notifications" */))
const _e40dd120 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _13c9e8dc = () => interopDefault(import('..\\pages\\reservations\\index.vue' /* webpackChunkName: "pages_reservations_index" */))
const _13a1fab1 = () => interopDefault(import('..\\pages\\search.vue' /* webpackChunkName: "pages_search" */))
const _37c910ca = () => interopDefault(import('..\\pages\\success.vue' /* webpackChunkName: "pages_success" */))
const _73c44fe4 = () => interopDefault(import('..\\pages\\terms.vue' /* webpackChunkName: "pages_terms" */))
const _013cd95c = () => interopDefault(import('..\\pages\\thanks.vue' /* webpackChunkName: "pages_thanks" */))
const _28780f91 = () => interopDefault(import('..\\pages\\manager\\congratulations.vue' /* webpackChunkName: "pages_manager_congratulations" */))
const _3dc8a560 = () => interopDefault(import('..\\pages\\manager\\dashboard.vue' /* webpackChunkName: "pages_manager_dashboard" */))
const _7334b84c = () => interopDefault(import('..\\pages\\manager\\edit-profile.vue' /* webpackChunkName: "pages_manager_edit-profile" */))
const _0f0c6c12 = () => interopDefault(import('..\\pages\\manager\\exit.vue' /* webpackChunkName: "pages_manager_exit" */))
const _19cc922e = () => interopDefault(import('..\\pages\\manager\\generate.vue' /* webpackChunkName: "pages_manager_generate" */))
const _52d05ba4 = () => interopDefault(import('..\\pages\\manager\\notifications.vue' /* webpackChunkName: "pages_manager_notifications" */))
const _66001a36 = () => interopDefault(import('..\\pages\\manager\\profile.vue' /* webpackChunkName: "pages_manager_profile" */))
const _49b1f0de = () => interopDefault(import('..\\pages\\manager\\walk-ins.vue' /* webpackChunkName: "pages_manager_walk-ins" */))
const _1d327a76 = () => interopDefault(import('..\\pages\\reservations\\active.vue' /* webpackChunkName: "pages_reservations_active" */))
const _07c63ede = () => interopDefault(import('..\\pages\\reservations\\cancelled.vue' /* webpackChunkName: "pages_reservations_cancelled" */))
const _413b2758 = () => interopDefault(import('..\\pages\\reservations\\history.vue' /* webpackChunkName: "pages_reservations_history" */))
const _5f90f693 = () => interopDefault(import('..\\pages\\category\\_slug.vue' /* webpackChunkName: "pages_category__slug" */))
const _1c2019d9 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/exit",
    component: _639ce932,
    name: "exit"
  }, {
    path: "/make-reservation",
    component: _04e9f7b6,
    name: "make-reservation"
  }, {
    path: "/notifications",
    component: _633ea822,
    name: "notifications"
  }, {
    path: "/profile",
    component: _e40dd120,
    name: "profile"
  }, {
    path: "/reservations",
    component: _13c9e8dc,
    name: "reservations"
  }, {
    path: "/search",
    component: _13a1fab1,
    name: "search"
  }, {
    path: "/success",
    component: _37c910ca,
    name: "success"
  }, {
    path: "/terms",
    component: _73c44fe4,
    name: "terms"
  }, {
    path: "/thanks",
    component: _013cd95c,
    name: "thanks"
  }, {
    path: "/manager/congratulations",
    component: _28780f91,
    name: "manager-congratulations"
  }, {
    path: "/manager/dashboard",
    component: _3dc8a560,
    name: "manager-dashboard"
  }, {
    path: "/manager/edit-profile",
    component: _7334b84c,
    name: "manager-edit-profile"
  }, {
    path: "/manager/exit",
    component: _0f0c6c12,
    name: "manager-exit"
  }, {
    path: "/manager/generate",
    component: _19cc922e,
    name: "manager-generate"
  }, {
    path: "/manager/notifications",
    component: _52d05ba4,
    name: "manager-notifications"
  }, {
    path: "/manager/profile",
    component: _66001a36,
    name: "manager-profile"
  }, {
    path: "/manager/walk-ins",
    component: _49b1f0de,
    name: "manager-walk-ins"
  }, {
    path: "/reservations/active",
    component: _1d327a76,
    name: "reservations-active"
  }, {
    path: "/reservations/cancelled",
    component: _07c63ede,
    name: "reservations-cancelled"
  }, {
    path: "/reservations/history",
    component: _413b2758,
    name: "reservations-history"
  }, {
    path: "/category/:slug?",
    component: _5f90f693,
    name: "category-slug"
  }, {
    path: "/",
    component: _1c2019d9,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
