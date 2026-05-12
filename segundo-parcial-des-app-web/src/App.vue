<template>
  <NavbarComponent v-if="!route.meta.hideNavbar"/>
  <router-view />
</template>
<!-- la palabra setup registra cualquier componenete importado-->
<script setup>
import { useRoute } from 'vue-router';
// importamos el archivo NavbarComponent para monstrar el encabezado en todas las pestañas 
import NavbarComponent from './components/NavbarComponent.vue';
//mirar en la ruta donde estoy parado 
const route = useRoute()
</script>
