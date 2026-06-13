<template>
  <div class="vh-100 d-flex flex-column">
    <SidebarComponent />
    <div class="flex-grow-1 p-4 bg-light">
      <h2><i class="bi bi-speedometer2 me-2"></i>Bienvenido</h2>
      <p>Selecciona una opción del menú para gestionar Productos o Usuarios.</p>
    </div>
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue'

export default {
  name: 'DashboardView',
  components: { SidebarComponent }
}
</script>