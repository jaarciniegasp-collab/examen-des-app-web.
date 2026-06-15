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

          <li class="nav-item mb-3">
            <router-link
              class="nav-link text-white"
              to="/dashboard"
            >
              <i class="bi bi-speedometer2 me-2"></i>
              Dashboard
            </router-link>
          </li>

          <li class="nav-item mb-3">
            <router-link
              class="nav-link text-white"
              to="/products"
            >
              <i class="bi bi-box-seam-fill me-2"></i>
              Productos
            </router-link>
          </li>

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

          <li class="nav-item mb-3">
            <span class="nav-link text-info">
              <i class="bi bi-person-circle me-2"></i>
              {{ nombreUsuario }}
            </span>
          </li>

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

  computed: {
    nombreUsuario() {
      const user = JSON.parse(localStorage.getItem('user'))
      return user ? user.username : 'Invitado'
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/')
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