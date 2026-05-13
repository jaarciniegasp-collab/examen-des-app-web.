<template>
  <div class="app-container">
    <NavbarComponent v-if="!route.meta.hideNavbar" />

    <main class="contenido">
      <router-view />
    </main>

    <FooterComponent v-if="!route.meta.hideNavbar" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

const route = useRoute()
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.contenido {
  flex: 1;
}
</style>