import { CreateService } from '@/types/service'
import { TodosAPIS }  from '@/types/service'
import { object2QueryString, isObject } from '@/types/util'

const createTodosService: CreateService<TodosAPIS> = ($axios) => {
  const getTodoList: TodosAPIS['getTodoList'] = (data, config) => {
    let queryString = ''
    let url = '/list'

    if (data && isObject(data)) {
      queryString = object2QueryString(data)
    }

    if (queryString) {
      url = url + '?' + queryString
    }

    return $axios.get(url, config)
  }

  const getTodoDetail: TodosAPIS['getTodoDetail'] = (data, config) => {
    const { id } = data || {}
    const url = '/todo' + (id ? `/${id}` : '')
    return $axios.get(url, config)
  }
  return {
    getTodoList,
    getTodoDetail
  }
}

export default createTodosService
