<script setup lang="ts">
const emit = defineEmits<{ (event: 'add-todo', name: string): void }>()

const addTodo = (e: InputEvent) => {
  const target = e.target as HTMLInputElement
  const name = target.value
  if (!name.trim()) return
  emit('add-todo', name)
  target.value = ''
}
</script>

<template>
  <div class="todo-adding-input">
    <input type="text" placeholder="Enter new todo" @keyup.enter="addTodo" />
  </div>
</template>

<style lang="scss">
.todo-adding-input {
  height: 44px;

  input {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    width: 100%;
    padding: 10px;
    margin: 0;
    color: #333;

    &::placeholder {
      color: #999;
    }
  }
}
</style>
