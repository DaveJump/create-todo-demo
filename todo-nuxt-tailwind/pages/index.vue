<template>
  <div class="todo-container justify-center">
    <div class="user-login w-2/4 text-center">
      <div class="mb-10">
        <base-input
          @input="
            val => {
              formData.username = val
            }
          "
        />
      </div>
      <base-button type="primary" @click="toList">Proceed</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      formData: {
        username: ''
      }
    }
  },
  methods: {
    async toList() {
      const username = this.formData.username
      this.$nuxt.$store.commit('UPDATE_USER_NAME', username)
      this.$nuxt.$router.push('/list')
    }
  }
})
</script>
