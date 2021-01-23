import { MutationTree, ActionTree, GetterTree } from 'vuex'

export const state = () => ({
  username: ''
})

export type State = ReturnType<typeof state>

const UPDATE_USER_NAME = 'UPDATE_USER_NAME'

export const getters: GetterTree<State, State> = {
  username: state => state.username
}

export const actions: ActionTree<State, State> = {
  nuxtServerInit({ commit }) {
  }
}

export const mutations: MutationTree<State> = {
  [UPDATE_USER_NAME](state, payload) {
    state.username = payload
  }
}
