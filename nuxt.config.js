export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Найс',
    htmlAttrs: {
      lang: 'ru'
    },
    transition: 'home',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
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
    { src: '@plugins/vue-bottom-sheet.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/@ui',
      '~/components/@logic'
    ]
  },
  loading: false,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    'nuxt-font-loader',
    '@nuxtjs/eslint-module',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/svg',
    '@nuxt/image',
    'nuxt-gsap-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/auth-next',
    'nuxt-mq',
    'vue-toastification/nuxt',
    ['portal-vue/nuxt']
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
  fontLoader: {
    url: '/fonts/_fonts.css',

    prefetch: true,
    preconnect: true
  }
  // Build Configuration: https://go.nuxtjs.dev/config-build

}
