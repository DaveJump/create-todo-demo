import Vue from 'vue'
import { isObject } from '@/types/util'

const usernameKey = 'nuxt-todo-username'

function getItem(key: string) {
  if (process.client) {
    const item = window.localStorage.getItem(key)
    if (item) {
      try {
        return JSON.parse(item)
      } catch (e) {
        return item
      }
    }
    return item
  }
}

function setItem(key: string, value: any) {
  if (!key) {
    throw new TypeError('key can not be empty!')
  }
  if (process.client) {
    if (isObject(value)) {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      window.localStorage.setItem(key, value)
    }
  }
}

function setUsername(value: string) {
  setItem(usernameKey, value)
}

function getUsername(): string | undefined | null {
  return getItem(usernameKey)
}

export const $storage = {
  getItem,
  setItem,
  setUsername,
  getUsername
}

Vue.prototype.$storage = $storage
