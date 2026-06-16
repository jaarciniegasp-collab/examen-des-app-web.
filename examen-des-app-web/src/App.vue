<template>
  <div id="app">

    <!-- Navbar global -->
    <NavbarComponent v-if="$route.name !== 'Login'" />

    <main class="contenido">
      <router-view />
    </main>

    <!-- Footer global -->
    <FooterComponent v-if="$route.name !== 'Login'" />

  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent
  }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

body {
  overflow-y: auto;
  background: #f8f9fa;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.contenido {
  flex: 1;
  width: 100%;
}
</style>