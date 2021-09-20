<script setup lang="ts">
import './assets/styles/normalize.css'
import { ITodo, EFilterItems } from './types' // 入口组件导入类型有问题，貌似是 bug
import List from './components/List.vue'
import Adding from './components/Adding.vue'
import Filter from './components/Filter.vue'
import { useTodosStore } from './hooks'

import { ref } from 'vue'

let currentFilter = ref(EFilterItems['all'])
const { todos, todosHandler } = useTodosStore()

const addTodo = (name: string) => {
  todosHandler.add(name)
}

const filterChange = (filter: number) => {
  currentFilter.value = filter
}

const doneTodo = (id: string) => {
  todosHandler.done(id)
}

const deleteTodo = (id: string) => {
  todosHandler.delete(id)
}

const deleteAllTodos = () => {
  todosHandler.deleteAll()
}
</script>

<template>
  <div class="todo-main">
    <Adding @add-todo="addTodo"></Adding>
    <Filter @filter-change="filterChange"></Filter>
    <List
      :todos="todos"
      :currentFilter="currentFilter"
      @done-todo="(id: string) => doneTodo(id)"
      @delete-todo="(id: string) => deleteTodo(id)"
    ></List>
    <div class="todo-footer">
      <span v-show="todos.length" class="delete-all" @click="deleteAllTodos">Delete All</span>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #555;

  * {
    box-sizing: border-box;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
.todo-main {
  margin: 0 auto;
  max-width: 700px;
  width: 60vw;
  height: 65vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
.todo-footer {
  text-align: right;
  padding: 20px 30px;
  font-size: 14px;

  span {
    cursor: pointer;

    &.delete-all {
      color: rgb(170, 32, 32);
    }
  }
}
</style>
