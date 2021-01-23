<template>
  <div
    class="todo-item relative px-5 flex items-center justify-between text-green hover:bg-gray-200 dark-hover:bg-gray-800"
  >
    <nuxt-link :to="'/edit/' + todoData.id" class="w-11/12 py-3 cursor-pointer">
      <div>
        <div class="todo-item-head flex justify-between items-center">
          <span
            class="todo-item__title truncate font-bold"
            :class="{ 'line-through': todoData.done }"
            >{{ todoData.title }}</span
          >
          <span class="todo-item__exp-date text-gray-500 dark:text-gray-600">{{
            todoData.expDate
          }}</span>
        </div>
        <div
          class="todo-item-desc truncate"
          :class="{ 'line-through': todoData.done }"
        >
          {{ todoData.desc }}
        </div>
      </div>
    </nuxt-link>
    <div class="todo-item-operator flex flex-col items-center ml-3">
      <span class="text-green-600 hover:text-green-500 cursor-pointer" @click="toggleDone">
        {{todoData.done ? 'Undone' : 'Done'}}
      </span>
      <span class="text-red-600 hover:text-red-400 cursor-pointer" @click="deleteTodo">Delete</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Todo } from '@/types/todos'

export default Vue.extend({
  props: {
    todoData: {
      type: Object as PropType<Todo>,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  methods: {
    toggleDone() {},
    deleteTodo() {}
  }
})
</script>

<style lang="scss" scoped>
.todo-item {
  &-desc {
    height: 24px;
  }
  &-operator {
    flex: 0 0 65px;
    font-size: 14px;
  }
}
</style>
