<script setup lang="ts">
import { reactive } from 'vue'
import { EFilterItems } from '../types'
interface IFilterItem {
  label: string
  value: number
}
const items: IFilterItem[] = []
for (let i = 0; i < 3; i++) {
  items.push({
    label: EFilterItems[i + 1]?.replace(/^(\w{1})/, (s, g) => g.toUpperCase()),
    value: i + 1
  })
}

const state = reactive({
  filterItems: items,
  currentFilter: EFilterItems['all']
})

const emit = defineEmits<{ (event: 'filter-change', c: number): void }>()

const emitCurrentFilter = (c: number) => {
  state.currentFilter = c
  emit('filter-change', state.currentFilter)
}

emit('filter-change', state.currentFilter)
</script>

<template>
  <div class="todo-filter">
    <ul>
      <li
        v-for="item in state.filterItems"
        :key="item.value"
        @click="emitCurrentFilter(item.value)"
        :class="{ selected: state.currentFilter === item.value }"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.todo-filter {
  height: 32px;
  margin: 15px 0;

  ul {
    display: flex;
    justify-content: space-around;
    width: 100%;

    li {
      width: 80px;
      padding: 5px;
      border-radius: 4px;
      text-align: center;
      user-select: none;

      &:hover,
      &.selected {
        background-color: #e7e7e7;
        cursor: pointer;
      }
    }
  }
}
</style>
