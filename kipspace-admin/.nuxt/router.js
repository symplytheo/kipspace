import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _dea2dfc6 = () => interopDefault(import('..\\pages\\category.vue' /* webpackChunkName: "pages/category" */))
const _e542317c = () => interopDefault(import('..\\pages\\facility.vue' /* webpackChunkName: "pages/facility" */))
const _416c9b0e = () => interopDefault(import('..\\pages\\users.vue' /* webpackChunkName: "pages/users" */))
const _611fbffb = () => interopDefault(import('..\\pages\\account\\login.vue' /* webpackChunkName: "pages/account/login" */))
const _cc404f7a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/category",
    component: _dea2dfc6,
    name: "category"
  }, {
    path: "/facility",
    component: _e542317c,
    name: "facility"
  }, {
    path: "/users",
    component: _416c9b0e,
    name: "users"
  }, {
    path: "/account/login",
    component: _611fbffb,
    name: "account-login"
  }, {
    path: "/",
    component: _cc404f7a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
