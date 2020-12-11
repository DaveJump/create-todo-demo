<template>
  <div class="todo-app container mt-20 mx-auto px-10">
    <div class="navigation">
      <template v-for="link in navLinks" :key="link.path">
        <router-link :to="link.path" :class="classnames(link.classes)" v-slot="{href, isActive, navigate}" >
          <a :href="href" class="text-lg px-5" :class="isActive ? 'is-active underline text-blue-500' : 'text-gray-500'" @click="navigate">{{link.label}}</a>
        </router-link>
      </template>
    </div>
    <div class="container mt-8">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import classnames from 'classnames'

  interface NavLink {
    path: string
    label: string
    classes?: string[]
  }

  export default defineComponent({
    name: 'App',
    setup() {
      const navLinks = ref<NavLink[]>([
        {
          path: '/',
          label: 'TodoList',
          classes: ['mr-2']
        }
      ])
      return { navLinks, classnames }
    }
  })
</script>

<style scoped>
.todo-app {
  width: 800px;
}
.navigation a:not(.is-active) {
  text-decoration: none;
}
</style>
