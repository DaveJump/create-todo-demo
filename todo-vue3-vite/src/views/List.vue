<template>
  <div class="todo-list">
    <todo-input @confirm="addTodo" />
    <todo-filter @change="handleFilterChange" />
    <div class="todo-list-list mt-6 divide-y divide-gray-300">
      <template v-for="todo in todoList" :key="todo.uid">
        <todo-item
          v-if="inspectTodoShown(todo.done)"
          :values="todo"
          @toggleDone="toggleDoneTodo"
          @delete="deleteTodo"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import TodoInput from '/components/TodoList/Input.vue'
import TodoFilter from '/components/TodoList/Filter.vue'
import TodoItem from '/components/TodoList/Item.vue'
import type { TodoItem as ITodoItem, FilterProp } from '/@/types/todo.d'
import { useLocalStorage } from '@vueuse/core'
import { genUID } from '/@/utils'

const storageKey = 'todoList'

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoInput,
    TodoItem,
    TodoFilter,
  },
  setup(_props) {
    const todoList = useLocalStorage<ITodoItem[]>(storageKey, [])
    const curFilterProp = ref<FilterProp>('All')

    const addTodo = (title: string) => {
      todoList.value.push({
        uid: genUID(),
        title,
        done: false,
      })
    }
    const toggleDoneTodo = (uid: string) => {
      const todo = todoList.value.find((t) => t.uid === uid)
      if (todo) {
        todo.done = !todo.done
      }
    }
    const deleteTodo = (uid: string) => {
      const index = todoList.value.findIndex((t) => t.uid === uid)
      if (index >= 0) {
        todoList.value.splice(index, 1)
      }
    }
    const handleFilterChange = (prop: FilterProp) => {
      curFilterProp.value = prop
    }
    const inspectTodoShown = (done: boolean) => {
      switch (curFilterProp.value) {
        case 'All':
          return true
        case 'Done':
          return done
        case 'Undone':
          return !done
        default:
          return true
      }
    }

    watch(todoList, () => {
      useLocalStorage(storageKey, todoList)
    })

    return {
      todoList,
      addTodo,
      toggleDoneTodo,
      deleteTodo,
      curFilterProp,
      handleFilterChange,
      inspectTodoShown
    }
  },
})
</script>