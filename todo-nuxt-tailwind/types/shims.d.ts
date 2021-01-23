import { $storage } from '@/plugins/storage'
import { APIS } from '@/types/service'

declare module 'vue/types/vue' {
  // this.xxx inside Vue components
  interface Vue {
    methods: { [key: string]: (...args: any[]) => any }
    $storage: typeof $storage
    $api: APIS
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.xxx inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $api: APIS
  }
  // nuxtContext.xxx
  interface Context {
    $api: APIS
  }
}

declare module 'vuex/types/index' {
  // this.xxx inside Vuex stores
  interface Store<S> {
    $api: APIS
  }
}
