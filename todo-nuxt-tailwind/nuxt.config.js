export default {
  // Deploy production as static hosting, using "yarn generate" or "npm run generate"
  // target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'simply todos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A simply todo app build with nuxt' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Preload css variables and mixins globally
  styleResources: {
    scss: [
      './assets/scss/vars.scss',
    ]
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/storage',
    '@/plugins/axios',
    '@/plugins/service'
  ],

  // Router config
  router: {
    middleware: ['auth']
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://tailwindcss.nuxtjs.org/
    '@nuxtjs/tailwindcss',
    // https://medium.com/@fayazara/quick-way-to-implement-darkmode-in-nuxt-js-tailwindcss-corona-virus-tracker-712d004a0846
    '@nuxtjs/color-mode'
  ],

  tailwindcss: {
    // Options
    // https://tailwindcss.nuxtjs.org/setup/#options
  },

  purgeCSS: {
    whitelist: ['dark-mode'],
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/style-resources',
    // https://axios.nuxtjs.org/
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'https://api.todos.com',
    proxy: true,
    prefix: '/api'
  },

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3010',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
