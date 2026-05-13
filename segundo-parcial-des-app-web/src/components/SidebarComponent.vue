<template>
  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasDarkNavbar"
    aria-controls="offcanvasDarkNavbar"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div
    class="offcanvas offcanvas-end text-bg-dark"
    tabindex="-1"
    id="offcanvasDarkNavbar"
    aria-labelledby="offcanvasDarkNavbarLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
        <i class="bi bi-list me-2"></i>Menú
      </h5>

      <button
        type="button"
        class="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>

    <div class="offcanvas-body">
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">

        <!-- Cliente -->
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{
              'active fw-bold link-light': seccionActiva === 'cliente',
            }"
            aria-current="page"
            href="#"
            @click="cliente"
          >
            <i class="bi bi-person-circle me-2"></i>
            Cliente
          </a>
        </li>

        <!-- Productos -->
        <li class="nav-item">
          <a
            class="nav-link active"
            href="#"
            :class="{
              'active fw-bold link-light': seccionActiva === 'productos',
            }"
            @click="productos"
          >
            <i class="bi bi-box-seam me-2"></i>
            Productos Edición
          </a>
        </li>

        <!-- Categorías -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle active"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-tags me-2"></i>
            Categorías
          </a>

          <ul class="dropdown-menu dropdown-menu-dark">
            <li>
              <a class="dropdown-item" href="#" @click="viveres">
                <i class="bi bi-basket me-2"></i>
                Víveres
              </a>
            </li>

            <li>
              <a class="dropdown-item" href="#" @click="lacteos">
                <i class="bi bi-egg-fried me-2"></i>
                Lácteos y Huevos
              </a>
            </li>

            <li>
              <a class="dropdown-item" href="#" @click="licores">
                <i class="bi bi-cup-straw me-2"></i>
                Licores
              </a>
            </li>

            <li>
              <a class="dropdown-item" href="#" @click="dulces">
                <i class="bi bi-cookie me-2"></i>
                Dulces
              </a>
            </li>

            <li>
              <a class="dropdown-item" href="#" @click="cuidado">
                <i class="bi bi-heart-pulse me-2"></i>
                Cuidado Personal
              </a>
            </li>
          </ul>
        </li>

        <!-- Contacto -->
        <li class="nav-item">
          <a class="nav-link active" href="#">
            <i class="bi bi-envelope-fill me-2"></i>
            Contacto
          </a>
        </li>

        <!-- Salir -->
        <li class="nav-item">
          <a class="nav-link active" href="#" @click="salida">
            <i class="bi bi-box-arrow-right me-2"></i>
            Salir
          </a>
        </li>

      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "SidebarComponent",

  data() {
    return {
      seccionActiva: "cliente",
    };
  },
  methods: {
    cliente() {
      this.$router.push("/dashboard");
      // se utiliza para controlar los resaltos de los link entre paginas
      this.seccionActiva = "cliente";
    },
    productos() {
      this.$router.push("/productos");
      this.seccionActiva = "productos";
    },
    salida() {
      this.$router.push("/salida");
    },
    viveres() {
      this.$router.push("/viveres");
    },
    lacteos() {
      this.$router.push("/lacteos");
    },
    licores() {
      this.$router.push("/licores");
    },
    dulces() {
      this.$router.push("/dulces");
    },
    cuidado() {
      this.$router.push("/cuidado");
    },
  },
};
</script>
