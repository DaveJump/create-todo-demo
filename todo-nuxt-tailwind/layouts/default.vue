<template>
  <div class="todo-main text-gray-700 dark:text-gray-400 dark:bg-gray-900">
    <nav
      class="fixed top-0 z-40 w-full border-b dark:border-gray-800 bg-white dark:bg-gray-900"
    >
      <div class="container mx-auto flex-1 px-4 lg:px-8">
        <div class="flex items-center h-16">
          <nuxt-link
            to="/"
            class="text-xl font-extrabold mr-24 dark:text-gray-400"
          >
            Simply Todos
          </nuxt-link>
          <nav-list />
          <search-input />
          <account ref="account" />
        </div>
      </div>
    </nav>
    <Nuxt />
    <app-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const mockTodoList = [
  {
    id: 123,
    title: 'Fugiat corrupti suscipit',
    desc:
      'Fugiat corrupti suscipit praesentium, vero facilis minima eum dolor, asperiores quia, voluptas assumenda dolorem voluptate adipisci provident neque ab perferendis magni tenetur.',
    expDate: '2021-02-25',
    done: false
  },
  {
    id: 456,
    title: 'Non aut explicabo veniam',
    desc:
      'Non aut explicabo veniam quasi et. Id obcaecati ratione aut, doloremque dolorum aliquam, tempora voluptatem at, temporibus excepturi fugiat quasi itaque optio!',
    expDate: '2021-03-11',
    done: true
  }
]

export default Vue.extend({
  data() {
    return {
    }
  },
  mounted() {
    this.$storage.setItem('nuxt-todo-list', mockTodoList)
  }
})
</script>

<style lang="postcss">
.todo-container {
  height: calc(100vh - 64px);
  @apply relative px-24 flex items-center;

  & .inner-content {
    height: 70%;
  }
}
.dark-img {
  display: none;
}
.dark-mode {
  & .dark-img {
    display: inline-block;
  }
  & .light-img {
    display: none;
  }
}
</style>
