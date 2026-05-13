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
      <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menú</h5>
      <button
        type="button"
        class="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{
              'active fw-bold link-light': seccionActiva === 'cliente',
            }"
            aria-current="page"
            href="#"
            @click="cliente"
            >Cliente</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link active"
            href="#"
            :class="{
              'active fw-bold link-light': seccionActiva === 'productos',
            }"
            @click="productos"
            >Productos Edicion</a
          >
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle active"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categorías
          </a>
          <ul class="dropdown-menu dropdown-menu-dark">
            <li>
              <a class="dropdown-item" href="#" @click="viveres">Viveres</a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="lacteos"
                >Lacteos y Huevos</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="licores">Licores</a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="dulces">Dulces</a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="cuidado"
                >Cuidado Personal</a
              >
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#">Contacto</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#" @click="salida">Salir</a>
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
