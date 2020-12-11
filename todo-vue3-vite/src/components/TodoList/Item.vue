<template>
  <div class="todo-item p-3 flex flex-no-wrap justify-between items-center">
    <div class="todo-item-label w-200 truncate" :class="values.done && 'line-through text-gray-500'">{{values.title}}</div>
    <div class="todo-item-operator text-blue-500">
      <span class="hover:underline cursor-pointer mr-5" @click="toggleDone">
        {{values.done ? 'Undone' : 'Done'}}
      </span>
      <span class="text-red-500 cursor-pointer hover:underline" @click="deleteTodo">Delete</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TodoItem } from '/@/types/todo.d'

export default defineComponent({
  name: 'TodoItem',
  props: {
    values: {
      type: Object as PropType<TodoItem>,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const toggleDone = () => {
      ctx.emit('toggleDone', props.values.uid)
    }
    const deleteTodo = () => {
      ctx.emit('delete', props.values.uid)
    }

    return {
      toggleDone,
      deleteTodo
    }
  }
})
</script>
