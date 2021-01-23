<template>
  <div class="nav-list mr-24">
    <ul class="space-x-5 flex items-center">
      <li v-for="nav in navList" :key="nav.id" class="p-3">
        <nuxt-link :to="nav.to" class="hover:text-green-600">{{nav.title}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      navList: [
        {
          id: 1,
          title: 'Todo List',
          to: '/list'
        },
        {
          id: 2,
          title: 'Add Todo',
          to: '/add'
        }
      ]
    }
  }
})
</script>
