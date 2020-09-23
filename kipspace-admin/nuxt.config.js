export default {
  head: {
    titleTemplate: '%s - Kipspace Admin',
    title: 'Kipspace Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
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

  css: [],

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },

  plugins: [],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/apollo'],

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

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '~/plugins/vuetify.config.js',
  },

  build: {},
}
