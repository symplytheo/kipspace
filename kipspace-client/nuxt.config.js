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
  css: [],
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },
  plugins: [],
  buildModules: ['@nuxtjs/vuetify'],
  modules: ['@nuxtjs/pwa', '@nuxtjs/axios', '@nuxtjs/apollo'],
  vuetify: {
    customVariables: ['~/assets/style/variables.scss'],
    optionsPath: '~/plugins/vuetify.config.js',
  },
  axios: {
    baseURL: `${process.env.BASE_URL || 'http://localhost:3000'}/api`,
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `${process.env.BASE_URL}/api/graphql`,
      },
    },
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
