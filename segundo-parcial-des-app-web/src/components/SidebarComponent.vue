<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <span class="navbar-brand ps-3">
        <i class="bi bi-grid-fill me-2"></i>Panel
      </span>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'ProductList' }">
              <i class="bi bi-box-seam me-1"></i> Productos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'UserList' }">
              <i class="bi bi-people-fill me-1"></i> Usuarios
            </router-link>
          </li>
          <li class="nav-item">
            <a @click="logout" class="nav-link" style="cursor: pointer">
              <i class="bi bi-box-arrow-right me-1"></i> Cerrar sesión
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
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/')
    }
  }
}
</script>