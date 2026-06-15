<template>
  <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
    <div class="container-fluid">

      <!-- Logo -->
      <div class="navbar-brand d-flex align-items-center">
        <img
          :src="require('@/assets/Logo.png')"
          alt="Logo Micromercado Koki"
          class="logo-navbar"
        />
      </div>

      <!-- Menú superior -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto">

          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'ProductList' }"
            >
              <i class="bi bi-box-seam me-2"></i>
              Productos
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'UserList' }"
            >
              <i class="bi bi-people-fill me-2"></i>
              Usuarios
            </router-link>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              @click="logout"
              style="cursor:pointer"
            >
              <i class="bi bi-box-arrow-right me-2"></i>
              Cerrar sesión
            </a>
          </li>

        </ul>
      </div>

      <!-- BOTÓN SIDEBAR -->
      <button
        class="btn btn-outline-light ms-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#menuLateral"
      >
        <i class="bi bi-list fs-3"></i>
      </button>

    </div>

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

          <hr class="text-secondary" />

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
  </nav>
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

<style>
.custom-navbar {
  background: linear-gradient(90deg, #0d6efd, #0a58ca);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding-top: 10px;
  padding-bottom: 10px;
}

.logo-navbar {
  height: 70px;
  width: auto;
  object-fit: contain;
}

.navbar-brand {
  margin-right: 20px;
}

.nav-link {
  font-size: 16px;
  font-weight: 600;
  color: white !important;
  margin-left: 10px;
  border-radius: 8px;
  padding: 8px 14px !important;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.offcanvas {
  width: 300px;
}
</style>