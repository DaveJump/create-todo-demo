<template>
  <button
    class="btn"
    :class="{
      'btn-primary': type === 'primary',
      'btn-default': type === 'default'
    }"
    type="button"
    @click="$emit('click')"
  ><slot /></button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'default'
    }
  }
})
</script>

<style lang="postcss" scoped>
.btn {
  @apply py-2 px-4 rounded;
}
.btn-primary {
  @apply bg-green-600 text-white;
  &:hover {
    @apply bg-green-500;
  }
  &:focus {
    @apply outline-none;
  }
}
.btn-default {
  @apply bg-transparent text-gray-700 border border-gray-300;
}
</style>
