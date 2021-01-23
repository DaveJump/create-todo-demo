<template>
  <div>
    <textarea
      class="base-input"
      cols="30"
      rows="3"
      :placeholder="placeholder"
      v-model="inputValue"
      v-if="type === 'textarea'"
    ></textarea>
    <input
      v-else
      class="base-input"
      :type="type"
      v-model="inputValue"
      @input="handleInput"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: String,
    placeholder: {
      type: String,
      default: 'Please enter'
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {}
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(val: string | InputEvent) {
        let value
        if (val instanceof InputEvent) {
          value = (val.target as HTMLInputElement).value
        } else if (typeof val === 'string') {
          value = val
        }
        this.$emit('input', value)
      }
    }
  },
  methods: {
    handleInput(evt: InputEvent) {
      const value = (evt.target as HTMLInputElement).value
      this.inputValue = value
      this.$emit('input', value)
    }
  }
})
</script>

<style lang="postcss" scoped>
.base-input {
  @apply py-2 px-3 border border-gray-300 outline-none rounded w-full;
  &:focus {
    @apply border-green-400;
  }
}
.dark-mode .base-input {
  @apply border-gray-700 bg-gray-900 text-white;
  &:focus {
    @apply border-green-700;
  }
}
</style>
