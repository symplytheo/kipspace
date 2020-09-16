export default {
  mode: 'universal',
  head: {
    titleTemplate: '%s - Kipspace',
    title: 'Welcome to Kipspace',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
      },
    ],
  },
  loading: { color: '#EA3788' },
  components: [
    '~/components/',
    { path: '~/components/make-reservation/', prefix: 'Mkr' },
  ],
  css: [],
  plugins: [],
  buildModules: ['@nuxtjs/vuetify'],
  modules: ['@nuxtjs/pwa', '@nuxtjs/axios'],
  vuetify: {
    customVariables: ['~/assets/style/variables.scss'],
    optionsPath: '~/plugins/vuetify.config.js',
  },
  axios: {
    baseURL: 'http://kipspace.temilorun.com/api',
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
