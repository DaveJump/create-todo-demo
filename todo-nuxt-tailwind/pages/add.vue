<template>
  <div class="add-todo todo-container">
    <div class="w-full">
      <div class="w-8/12 mx-auto mb-10 flex">
        <nuxt-link class="hover:text-green-600" to="/list">Todos</nuxt-link>
        <span class="text-gray-500 mx-4 dark:text-gray-600">></span>
        <span>Adding</span>
      </div>
      <edit-todo ref="editTodo" @data-change="handleDataChange" />
      <div class="w-8/12 m-auto" >
        <base-button @click="addTodo" type="primary">Add Todo</base-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Todo } from '@/types/todos'

export default Vue.extend({
  data() {
    return {
      todoData: {
        title: '',
        desc: '',
        expDate: '',
        done: false
      } as Todo
    }
  },
  methods: {
    handleDataChange(val: Todo) {
      this.todoData = {...val}
    },
    async addTodo() {
    }
  }
})
</script>
