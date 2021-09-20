<script setup lang="ts">
import { EFilterItems, ITodo } from '../types'

interface ITodoListProps {
  todos: ITodo[]
  currentFilter: number
}

const props = withDefaults(defineProps<ITodoListProps>(), {
  todos: () => [],
  currentFilter: EFilterItems['all']
})

const emit =
  defineEmits<{
    (event: 'delete-todo', id: ITodo['id']): void
    (event: 'done-todo', id: ITodo['id']): void
  }>()

const listFilterProcess: (item: ITodo) => boolean = item => {
  return (
    props.currentFilter === EFilterItems['all'] ||
    (props.currentFilter === EFilterItems['done'] ? item.done : !item.done)
  )
}

const doneTodo = (id: ITodo['id']) => {
  emit('done-todo', id)
}

const deleteTodo = (id: ITodo['id']) => {
  emit('delete-todo', id)
}
</script>

<template>
  <div class="todo-list">
    <ul>
      <template v-for="(item, i) in props.todos" :key="item.addTime || i">
        <li v-show="listFilterProcess(item)" class="todo-item">
          <div class="todo-item__title" :class="{ done: item.done }">
            {{ item.title }}
          </div>
          <div class="todo-item__mp">
            <span class="mp__done-undone" @click="doneTodo(item.id)">{{
              (item.done ? EFilterItems[3] : EFilterItems[2]).replace(
                /^(\w{1})/,
                (s, g) => g.toUpperCase()
              )
            }}</span>
            <span class="mp__delete" @click="deleteTodo(item.id)">Delete</span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.todo-list {
  flex: 1 1;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;

  .todo-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
    margin: 0 15px;
    margin-top: -1px;

    + .todo-item {
      border-top: 1px solid #f1f1f1;
    }

    &__title {
      flex: 1 1;
      padding-right: 10px;

      &.done {
        text-decoration: line-through;
        color: #999;
      }
    }

    &__mp {
      display: flex;
      justify-content: space-around;

      span {
        display: inline-block;
        font-size: 14px;
        margin-right: 15px;
        width: 50px;

        + span {
          margin: 0;
        }

        &:hover {
          cursor: pointer;
        }
        &.mp__delete {
          color: rgb(170, 32, 32);
        }
      }
    }
  }
}
</style>
