import { Plugin } from '@nuxt/types'
import createTodosService from '@/service/apis/todos'

const ServicePlugin: Plugin = ({ $axios }, inject) => {
  inject('api', {
    ...createTodosService($axios)
  })
}

export default ServicePlugin
