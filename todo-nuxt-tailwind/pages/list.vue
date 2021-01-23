<template>
  <div class="todo-container">
    <div class="w-2/3 m-auto inner-content pt-4">
      <ul class="filters flex justify-center items-center space-x-5">
        <li
          v-for="item in filterItems"
          :key="item"
          class="py-2 px-3 rounded cursor-pointer hover:text-green-600 font-bold"
          :class="curFilterText === item ? 'text-green-600' : ''"
          @click="changeFilter(item)"
        >
          {{ item }}
        </li>
      </ul>
      <div
        class="todo-list w-1/2 border border-gray-300 dark:border-gray-700 w-full mt-6 h-full rounded overflow-y-auto overflow-x-hidden divide-y divide-gray-200 dark:divide-gray-800"
        :class="{'loading': $fetchState.pending}"
      >
        <div v-for="item in todoList" :key="item.id">
          <todo-item :todo-data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Todo, FilterItems } from '@/types/todos'

type FilterText = keyof typeof FilterItems

export default Vue.extend({
  data() {
    return {
      todoList: [] as Todo[],
      filterItems: ['All', 'Done', 'Undone'] as FilterText[],
      curFilterText: 'All'
    }
  },
  async fetch() {
    let list = this.$storage.getItem('nuxt-todo-list') || []
    try {
      const res = await this.$api.getTodoList()
      if (res) {
        list = res
      }
    } finally {
      this.todoList = list
    }
  },
  methods: {
    changeFilter(text: FilterText) {
      this.curFilterText = text
    }
  }
})
</script>

<style lang="scss" scoped>
.todo-list {
  height: calc(100% - 72px);
}
</style>
