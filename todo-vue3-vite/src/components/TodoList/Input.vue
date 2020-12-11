<template>
  <div class="todo-input">
    <input
      type="text"
      v-model="titleValue"
      class="p-3 w-full border border-gray-400 focus:border-blue-500 rounded"
      placeholder="Press Enter to add new todo"
      @keyup.enter="emitTodoTitle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'

export default defineComponent({
  name: 'TodoInput',
  setup(_props, ctx) {
    const titleValue = ref('')

    const emitTodoTitle = async (evt: KeyboardEvent) => {
      const target = evt.target as HTMLInputElement
      ctx.emit('confirm', titleValue.value || target.value)
      await nextTick()
      target.value = ''
    }

    return {
      titleValue,
      emitTodoTitle
    }
  },
})
</script>