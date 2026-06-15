<template>
  <div id="app">

    <!-- Navbar global -->
    <NavbarComponent v-if="$route.name !== 'Login'" />

    <router-view />

  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'

export default {
  name: 'App',
  components: {
    NavbarComponent
  }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

body {
  overflow-y: auto;
  background: #f8f9fa;
}
</style>