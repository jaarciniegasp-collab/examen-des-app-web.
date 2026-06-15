<template>
  <div class="container-fluid">

    <div class="row">

      <SidebarComponent />

      <main class="col-md-10 ms-sm-auto px-4 py-4">

        <h2 class="mb-3">
          <i class="bi bi-speedometer2 me-2"></i>
          Bienvenido
        </h2>

        <p>
          Selecciona una opción del menú para gestionar Productos o Usuarios.
        </p>

      </main>

    </div>

  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue'

export default {
  name: 'DashboardView',
  components: {
    SidebarComponent
  }
}
</script>