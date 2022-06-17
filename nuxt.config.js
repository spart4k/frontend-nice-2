export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend-nice-nuxt3',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // transition: {
  //   mode: 'in-out'
  // },
  // cache: false,
  server: {
    port: 8000 // default: 3000
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  // Load a Node.js module directly (here it's a Sass file)
  // CSS file in the project
    '../assets/style/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@plugins/infiniteloading.js', ssr: false },
    { src: '@plugins/vualidate.js' },
    '@plugins/v-mask.js',
    '@plugins/v-tooltip.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/@ui',
      '~/components/@logic'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/svg'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL
  },

  styleResources: {
    scss: [
      '~/assets/style/_variables.scss'
    ]
  },
  auth: {
    // Options
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
