<template>
  <div>
    <!-- BOTON MENU -->
    <button
      class="btn btn-outline-light"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#menuLateral"
    >
      <i class="bi bi-list fs-3"></i>
    </button>

    <!-- SIDEBAR -->
    <div
      class="offcanvas offcanvas-end text-bg-dark"
      tabindex="-1"
      id="menuLateral"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">
          <i class="bi bi-grid-fill me-2"></i>
          Menú Principal
        </h5>

        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>

      <div class="offcanvas-body">
        <ul class="navbar-nav">

          <!-- INICIO (antes Dashboard) -->
          <li class="nav-item mb-3">
            <router-link
              class="nav-link text-white"
              to="/dashboard"
            >
              <i class="bi bi-house-door-fill me-2"></i>
              Inicio
            </router-link>
          </li>

          <!-- NUEVO: Dropdown Categorías (manejado con Vue) -->
          <li class="nav-item dropdown mb-3">
            <a
              class="nav-link dropdown-toggle text-white"
              href="#"
              role="button"
              @click.prevent="toggleCategorias"
              aria-expanded="false"
            >
              <i class="bi bi-tags-fill me-2"></i> Categorías
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" :class="{ show: mostrarCategorias }">
              <li><router-link class="dropdown-item" to="/viveres" @click="cerrarMenuCategorias"><i class="bi bi-basket-fill me-2"></i>Víveres</router-link></li>
              <li><router-link class="dropdown-item" to="/lacteos-y-huevos" @click="cerrarMenuCategorias"><i class="bi bi-egg-fill me-2"></i>Lácteos y huevos</router-link></li>
              <li><router-link class="dropdown-item" to="/licores" @click="cerrarMenuCategorias"><i class="bi bi-cup-straw me-2"></i>Licores</router-link></li>
              <li><router-link class="dropdown-item" to="/dulces" @click="cerrarMenuCategorias"><i class="bi bi-emoji-smile me-2"></i>Dulces</router-link></li>
              <li><router-link class="dropdown-item" to="/cuidado-personal" @click="cerrarMenuCategorias"><i class="bi bi-heart-pulse me-2"></i>Cuidado personal</router-link></li>
            </ul>
          </li>

          <!-- Productos -->
          <li class="nav-item mb-3">
            <router-link
              class="nav-link text-white"
              to="/products"
            >
              <i class="bi bi-box-seam-fill me-2"></i>
              Productos
            </router-link>
          </li>

          <!-- Usuarios -->
          <li class="nav-item mb-3">
            <router-link
              class="nav-link text-white"
              to="/users"
            >
              <i class="bi bi-people-fill me-2"></i>
              Usuarios
            </router-link>
          </li>

          <hr class="text-secondary">

          <!-- Usuario actual -->
          <li class="nav-item mb-3">
            <span class="nav-link text-info">
              <i class="bi bi-person-circle me-2"></i>
              {{ nombreUsuario }}
            </span>
          </li>

          <!-- Cerrar sesión -->
          <li class="nav-item">
            <a
              class="nav-link text-danger"
              href="#"
              @click.prevent="logout"
            >
              <i class="bi bi-box-arrow-right me-2"></i>
              Cerrar Sesión
            </a>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent',

  data() {
    return {
      mostrarCategorias: false
    }
  },

  computed: {
    nombreUsuario() {
      const user = JSON.parse(localStorage.getItem('user'))
      return user ? user.username : 'Invitado'
    }
  },

  methods: {
    toggleCategorias() {
      this.mostrarCategorias = !this.mostrarCategorias
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/')
    },
      cerrarMenuCategorias() {
      this.mostrarCategorias = false
    }
  }
}
</script>

<style scoped>
.nav-link {
  font-size: 17px;
  transition: 0.3s;
}

.nav-link:hover {
  padding-left: 8px;
  color: #0d6efd !important;
}

.offcanvas {
  width: 300px;
}
</style>