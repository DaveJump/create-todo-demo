<template>
  <div class="edit-todo todo-container">
    <div class="w-full">
      <div class="w-8/12 mx-auto mb-10 flex">
        <nuxt-link class="hover:text-green-500" to="/list">Todos</nuxt-link>
        <span class="text-gray-500 mx-4 dark:text-gray-600">></span>
        <span>Editing</span>
        <span class="text-gray-500 mx-4 dark:text-gray-600">></span>
        <span>{{editingTodoId}}</span>
      </div>
      <edit-todo
        ref="editTodo"
        @data-change="handleDataChange"
        :editing-todo-id="editingTodoId"
        :disabled="$fetchState.pending"
      />
      <div class="w-8/12 m-auto">
        <base-button @click="editTodo" type="primary">Edit Todo</base-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Todo } from '@/types/todos'

const emptyTodo = {
  title: '',
  desc: '',
  expDate: '',
  done: false
} as Todo

export default Vue.extend({
  data() {
    return {
      todoData: {...emptyTodo},
      editingTodoId: '' as Todo['id']
    }
  },
  async fetch() {
    const id = this.$route.params.id
    this.editingTodoId = id || ''
  },
  methods: {
    handleDataChange(val: Todo) {
      this.todoData = { ...val }
    },
    async editTodo() {}
  }
})
</script>
