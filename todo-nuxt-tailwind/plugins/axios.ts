import { Plugin } from '@nuxt/types'

const AxiosPlugin: Plugin = ({ $axios, redirect }) => {
  $axios.onRequest(config => {
  })

  $axios.onResponse(res => {
    const data = res.data
    if (data) {
      if (data.code === 200) {
        return data.result
      } else if (data.code === 500) {
        return data.message
      }
    }
    return data
  })

  $axios.onError(error => {
    const code = error.response?.status
    switch(code) {
      case 401:
        redirect('/')
        break
      case 403:
        redirect('/')
        break
      default:
        break
    }
  })
}

export default AxiosPlugin
