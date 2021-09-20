import { reactive, toRefs } from 'vue'
import { ITodo } from '../types'
import { genUUID } from '../utils'

export function useTodosStore() {
  let data = reactive<{todos: ITodo[]}>({
    todos: []
  })

  const storeTodos = {
    set(todos: ITodo[]) {
      window.localStorage.setItem('vue3-todos', JSON.stringify(todos))
    },
    get() {
      return window.localStorage.getItem('vue3-todos')
    }
  }

  const previousTodos = storeTodos.get()
  data.todos = previousTodos ? JSON.parse(previousTodos) : []

  type TodosHanlder = {
    add: {
      (item: SetOptional<ITodo, 'id'>): void
      (name: string): void
    }
    done(id: ITodo['id']): void
    delete(id: ITodo['id']): void
    deleteAll(): void
  }

  const todosHandler: TodosHanlder = {
    add(item) {
      if (typeof item === 'string') {
        item = {
          id: genUUID(),
          title: item,
          done: false,
          addTime: Date.now()
        }
      }
      if (!item.id) {
        item.id = genUUID()
      }
      if (!item.addTime) {
        item.addTime = Date.now()
      }
      data.todos.push(item as ITodo)
      storeTodos.set(data.todos)
    },
    done(id) {
      const todo = data.todos.find(todo => todo.id === id)
      if (todo) {
        todo.done = !todo.done
      }
      storeTodos.set(data.todos)
    },
    delete(id) {
      const index = data.todos.findIndex((todo) => todo.id === id)
      data.todos.splice(index, 1)
      storeTodos.set(data.todos)
    },
    deleteAll() {
      data.todos = []
      storeTodos.set([])
    }
  }

  return {
    ...toRefs(data),
    todosHandler
  }
}
