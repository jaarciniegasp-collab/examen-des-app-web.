<template>
  <nav class="navbar navbar-dark navbar-azul">
    <div class="container-fluid d-flex justify-content-between align-items-center">

      <!-- LOGO -->
      <span class="navbar-brand p-0 m-0">
        <img
          src="/imagenes/Logo.png"
          alt="Micromercado Koki"
          height="150"
        />
      </span>

      
      <form class="d-flex d-none d-md-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Buscar"
        />
        <button class="btn btn-outline-light" type="button">
          Buscar
        </button>
      </form>

      <div class="d-flex align-items-center gap-2">
        
        <button class="btn btn-outline-light position-relative" @click="openCart">
          <i class="bi bi-cart-fill fs-3"></i>
          <span
            v-if="totalItems > 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ totalItems }}
          </span>
        </button>

        <SidebarComponent />

        <CartOffcanvas ref="cartOffcanvas" />
      </div>

    </div>
  </nav>
</template>

<script>
import SidebarComponent from './SidebarComponent.vue'
import CartOffcanvas from './CartOffcanvas.vue'
import { useCart } from '@/stores/cartStore'

export default {
  name: 'NavbarComponent',
  components: {
    SidebarComponent,
    CartOffcanvas
  },
  setup() {
    const { totalItems } = useCart()
    return { totalItems }
  },
  methods: {
    openCart() {
      this.$refs.cartOffcanvas.showCart()
    }
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


.position-relative .badge {
  font-size: 0.7rem;
}
</style>