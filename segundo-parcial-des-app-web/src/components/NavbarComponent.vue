<template>
  <nav class="navbar navbar-dark navbar-azul">
    <div class="container-fluid">

      <!-- Logo -->
      <a class="navbar-brand" href="#">
        <img
          src="../assets/iconos/Logo.png"
          alt="Logo"
          width="250"
          height="150"
        />
      </a>

      <!-- Buscador -->
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Buscar"
        />
        <button class="btn btn-outline-light btn-buscar" type="submit">
  Buscar
</button>
      </form>

      <div class="d-flex align-items-center gap-3">

        <!-- BOTÓN CARRITO -->
        <button
          class="btn btn-outline-light position-relative"
          data-bs-toggle="offcanvas"
          data-bs-target="#carritoCanvas"
        >
          <i class="bi bi-cart-fill fs-4"></i>

          <!-- Cantidad -->
          <span
            v-if="cantidadProductos > 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ cantidadProductos }}
          </span>
        </button>

        <!-- Sidebar -->
        <SidebarComponent />
      </div>
    </div>
  </nav>

  <!-- OFFCANVAS CARRITO -->
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="carritoCanvas"
  >
    <div class="offcanvas-header bg-dark text-white">
      <h5 class="offcanvas-title">
        <i class="bi bi-cart-fill me-2"></i>
        Carrito de compras
      </h5>

      <button
        type="button"
        class="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>

    <div class="offcanvas-body">

      <!-- Sin productos -->
      <div v-if="carrito.length === 0" class="text-center">
        <h5>No hay productos en el carrito</h5>
      </div>

      <!-- Productos -->
      <div
        v-for="item in carrito"
        :key="item.id"
        class="card mb-3 shadow-sm"
      >
        <div class="card-body">

          <h6>{{ item.nombre }}</h6>

          <p class="mb-1">
            Precio:
            <strong>${{ item.precio }}</strong>
          </p>

          <p>
            Cantidad:
            <strong>{{ item.cantidad }}</strong>
          </p>

          <button
            class="btn btn-danger btn-sm"
            @click="eliminarProducto(item.id)"
          >
            Eliminar
          </button>
        </div>
      </div>

      <hr />

      <!-- Total -->
      <h4 class="text-center">
        Total: <span class="text-success">${{ total }}</span>
      </h4>

      <!-- Vaciar -->
      <button
        class="btn btn-warning w-100 mt-3"
        @click="vaciarCarrito"
      >
        Vaciar carrito
      </button>

    </div>
  </div>
</template>

<script>
import SidebarComponent from "./SidebarComponent.vue";

export default {
  name: "NavbarComponent",

  components: {
    SidebarComponent,
  },

  data() {
    return {
      carrito: [],
    };
  },

  mounted() {
    this.cargarCarrito();

    // escuchar cambios del carrito
    window.addEventListener("carritoActualizado", this.cargarCarrito);
  },

  beforeUnmount() {
    window.removeEventListener(
      "carritoActualizado",
      this.cargarCarrito
    );
  },

  computed: {
    cantidadProductos() {
      return this.carrito.reduce(
        (total, item) => total + item.cantidad,
        0
      );
    },

    total() {
      return this.carrito.reduce(
        (total, item) => total + item.precio * item.cantidad,
        0
      );
    },
  },

  methods: {
    cargarCarrito() {
      const datos = localStorage.getItem("carrito");

      this.carrito = datos ? JSON.parse(datos) : [];
    },

    eliminarProducto(id) {
      this.carrito = this.carrito.filter(
        (item) => item.id !== id
      );

      localStorage.setItem(
        "carrito",
        JSON.stringify(this.carrito)
      );
    },

    vaciarCarrito() {
      localStorage.removeItem("carrito");
      this.carrito = [];
    },
  },
};
</script>

<style scoped>
.navbar-azul {
  background-color: #0b1f3a; /* azul oscuro elegante */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* opcional: mejorar botones dentro del navbar */
.navbar-azul .btn-outline-light {
  border-color: #ffffff;
}

.navbar-azul .btn-outline-light:hover {
  background-color: #ffffff;
  color: #0b1f3a;
}

.navbar-azul .form-control {
  border-radius: 10px;
}
</style>