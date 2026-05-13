<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">

      <!-- LOGO -->
      <a class="navbar-brand" href="#">
        <img src="../assets/iconos/Logo.png" width="250" height="150" />
      </a>

      <!-- BUSCADOR -->
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search"/>
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>

      <!-- 🛒 CARRITO + SIDEBAR -->
      <div class="d-flex align-items-center gap-3">

        <!-- BOTÓN CARRITO -->
        <div id="carrito-btn" class="carrito">
          <i class="bi bi-cart-fill fs-4 text-dark"></i>
          <span id="contador">0</span>
        </div>

        <SidebarComponent/>

      </div>

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

<style>
.carrito {
  position: relative;
  background: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

#contador {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  font-size: 12px;
  padding: 3px 7px;
  border-radius: 50%;
}
</style>
