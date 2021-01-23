import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosRequestConfig } from 'axios'
import { Dictionary } from '@/types/util'
import { Todo } from '@/types/todos'

export type APIAction<T = any, D = any> = (data?: D, config?: AxiosRequestConfig) => Promise<T>

export type CreateService<T = Dictionary<APIAction>> = ($axios: NuxtAxiosInstance) => T

export type TodosAPIS = {
  getTodoList: APIAction<Todo[], { username: string }>
  getTodoDetail: APIAction<Todo, { id: string | number }>
}

export type APIS = TodosAPIS // cross with other types if needed
