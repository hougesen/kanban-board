export default {
  head: {
    title: 'kanban',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/stylelint-module'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', 'vue-sweetalert2/nuxt'],

  axios: {},

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  build: {},
};
