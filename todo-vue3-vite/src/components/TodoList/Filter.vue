<template>
  <div class="todo-filter flex place-content-center p-5 mt-5">
    <div
      v-for="filter in filters"
      :key="filter.prop"
      class="rounded px-3 py-1 text-gray-500 bg-gray-200 cursor-pointer mr-10"
      :class="filter.active && 'bg-blue-200 text-blue-500'"
      @click="toggleActive(filter)"
      >{{ filter.prop }}</div
    >
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Filter } from '/@/types/todo.d'

  export default defineComponent({
    name: 'TodoFilter',
    setup(_props, ctx) {
      const filters = ref<Filter[]>([
        { prop: 'All', active: true },
        { prop: 'Done', active: false },
        { prop: 'Undone', active: false },
      ])

      const toggleActive = (filter: Filter) => {
        filters.value.forEach(filter => {
          filter.active = false
        })
        filter.active = true

        ctx.emit('change', filter.prop)
      }

      return {
        filters,
        toggleActive
      }
    },
  })
</script>