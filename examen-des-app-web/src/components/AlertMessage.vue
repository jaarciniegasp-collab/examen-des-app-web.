<template>
  <div
    v-if="show"
    :class="['alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show']"
    role="alert"
  >
    <i :class="icon" class="me-2"></i>
    {{ message }}
    <button type="button" class="btn-close" @click="$emit('close')"></button>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    show: { type: Boolean, default: false },
    message: { type: String, default: '' },
    type: { type: String, default: 'success' } // success | danger | warning
  },
  computed: {
    icon() {
      const icons = {
        success: 'bi bi-check-circle-fill',
        danger: 'bi bi-exclamation-triangle-fill',
        warning: 'bi bi-exclamation-circle-fill'
      }
      return icons[this.type] || icons.success
    }
  }
}
</script>