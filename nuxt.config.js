import categories from './data/categories.json';

let categoryRoutes = () => {
  return new Promise(resolve => {
    resolve(categories.map(el => `/category/${el.slug}`))
  })
}

export default {
  mode: 'universal',
  head: {
    titleTemplate: '%s - Kipspace',
    title: 'My Nuxtjs Playground',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { 
        rel: 'stylesheet', 
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap'
      },
    ]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [],
  buildModules: ['@nuxtjs/vuetify'],
  modules: ['@nuxtjs/pwa'],
  vuetify: {
    customVariables: ['~/assets/style/variables.scss'],
    optionsPath: '~/plugins/veutify.config.js'
  },
  generate: {
    routes: categoryRoutes
  },
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
