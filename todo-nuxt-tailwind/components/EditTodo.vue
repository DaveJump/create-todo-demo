<template>
  <div class="edit-todo mb-10 mt-16 w-8/12 mx-auto">
    <div class="mb-5">
      <div class="mb-2">Title</div>
      <base-input v-model="formData.title" placeholder="Enter todo title"></base-input>
    </div>
    <div class="mb-5">
      <div class="mb-2">Description</div>
      <base-input type="textarea" v-model="formData.desc" placeholder="Enter todo desciption"></base-input>
    </div>
    <div class="mb-5">
      <div class="mb-2">Expiration Date</div>
      <base-input v-model="formData.expDate" placeholder="Enter todo expiration date"></base-input>
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
  props: {
    editingTodoId: {
      type: [Number, String]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {...emptyTodo}
    }
  },
  watch: {
    formData: {
      handler (val: Todo) {
        this.$emit('data-change', {...val})
      },
      deep: true
    }
  },
  async fetch() {
    if (this.editingTodoId) {
      let todo = {...emptyTodo}
      try {
        const curTodo = await this.$api.getTodoDetail({ id: this.editingTodoId })
        if (curTodo) {
          todo = curTodo
        }
      } catch {
        const todoList: Todo[] = this.$storage.getItem('nuxt-todo-list') || []
        const curTodo = todoList.find(t => +t.id === +this.editingTodoId) || {...emptyTodo}
        todo = curTodo
      } finally {
        this.formData = todo
      }
    }
  }
})
</script>

<style lang="scss">
.edit-todo {
  .label {
    width: 120px;
  }
}
</style>
