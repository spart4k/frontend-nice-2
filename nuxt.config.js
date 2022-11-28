export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Найс',
    htmlAttrs: {
      lang: 'ru'
    },
    // transition: 'home',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
      { name: 'apple-mobile-web-app-status-bar-style', content:'black'},
      { name: 'theme-color', content: '#ffffff' }

    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        type: 'image/png',
        href: '/favicons/apple-icon-57x57.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        type: 'image/png',
        href: '/favicons/apple-icon-60x60.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        type: 'image/png',
        href: '/favicons/apple-icon-72x72.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        type: 'image/png',
        href: '/favicons/apple-icon-76x76.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        type: 'image/png',
        href: '/favicons/apple-icon-114x114.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        type: 'image/png',
        href: '/favicons/apple-icon-120x120.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        type: 'image/png',
        href: '/favicons/apple-icon-144x144.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        type: 'image/png',
        href: '/favicons/apple-icon-152x152.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        href: '/favicons/apple-icon-180x180.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '192x192',
        type: 'image/png',
        href: '/favicons/apple-icon-192x192.png'
      },
      {
        rel: 'icon',
        sizes: '192x192',
        type: 'image/png',
        href: '/favicons/android-icon-192x192.png'
      },
      {
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
        href: '/favicons/favicon-32x32.png'
      },
      {
        rel: 'icon',
        sizes: '96x96',
        type: 'image/png',
        href: '/favicons/favicon-96x96.png'
      },
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: '/favicons/favicon-16x16.png'
      },
      {
        rel: 'manifest',
        type: 'image/png',
        href: '/favicons/manifest.json'
      }
    ]
        // meta: [
        //   {
        //     name: 'msapplication-TileColor',
        //     content: '#ffffff'
        //   },
        //   {
        //     name: 'msapplication-TileImage',
        //     content: '/ms-icon-144x144.png'
        //   },
        //   {
        //     name: 'theme-color',
        //     content: '#ffffff'
        //   }
        // ]
  },
  server: {
    port: process.env.PORT || 3030
    // port: process.env.PORT || 3030
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  // Load a Node.js module directly (here it's a Sass file)
  // CSS file in the project
    '../assets/style/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@plugins/vualidate.js' },
    '@plugins/v-mask.js',
    '@plugins/v-tooltip.js',
    '@plugins/v-lazyload.js',
    '@plugins/v-debounce.js',
    { src: '@plugins/v-infinity-scroll.js', ssr: false },
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
    baseURL: 'https://test.itisthenice.com'
    // baseURL: 'http://192.168.1.19:8999'
  },

  styleResources: {
    scss: [
      '~/assets/style/_variables.scss'
    ]
  },
  fontLoader: {
    // url: '/fonts/_fonts.css',

    prefetch: true,
    preconnect: true
  }

  // Build Configuration: https://go.nuxtjs.dev/config-build

}
