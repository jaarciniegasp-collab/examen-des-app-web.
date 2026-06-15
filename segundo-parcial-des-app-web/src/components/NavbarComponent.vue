<template>
  <nav class="navbar navbar-dark navbar-azul">
    <div class="container-fluid">

      <!-- LOGO -->
      <span class="navbar-brand">
        <img
          src="/imagenes/Logo.png"
          alt="Micromercado Koki"
          height="150"
        />
      </span>

      <!-- BUSCADOR -->
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Buscar"
        />

        <button
          class="btn btn-outline-light"
          type="button"
        >
          Buscar
        </button>
      </form>

      <!-- SIDEBAR -->
      <SidebarComponent />

    </div>
  </nav>
</template>

<script>
import SidebarComponent from './SidebarComponent.vue'

export default {
  name: 'NavbarComponent',
  components: {
    SidebarComponent
  }
}
</script>

<style scoped>
.navbar-azul {
  background: #071d49;
  min-height: 140px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
}

.form-control {
  border-radius: 10px;
  width: 250px;
}

.btn-outline-light:hover {
  background: white;
  color: #071d49;
}
</style>