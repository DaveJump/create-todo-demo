import { Middleware } from '@nuxt/types'
import { State } from '../store'
import { Store } from 'vuex'

const AuthMiddleware: Middleware = ({ redirect, store, route }) => {
  const username = (store as Store<State>).state.username
  if (route.path !== '/') {
    if (!username) {
      return redirect('/')
    }
  }
}

export default AuthMiddleware
