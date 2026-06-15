<template>
  <div>
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="cartOffcanvas"
      ref="cartOffcanvasRef"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">
          <i class="bi bi-cart-fill me-2"></i>Carrito de compras
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div
          v-if="state.items.length === 0"
          class="text-center text-muted mt-5"
        >
          <i class="bi bi-cart-x display-1"></i>
          <p class="mt-3">No hay productos en el carrito</p>
        </div>

        <div v-else>
          <ul class="list-group list-group-flush">
            <li
              v-for="item in state.items"
              :key="item.id"
              class="list-group-item d-flex justify-content-between align-items-start"
            >
              <div class="ms-2 me-auto">
                <div class="fw-bold">{{ item.name }}</div>
                <small class="text-muted">{{ item.category }}</small>
                <div>
                  <span class="text-danger fw-bold">${{ item.price }}</span>
                  <span class="ms-2 badge bg-secondary rounded-pill"
                    >x{{ item.quantity }}</span
                  >
                </div>
              </div>
              <button
                class="btn btn-danger btn-sm"
                @click="removeItem(item.id)"
                title="Eliminar del carrito"
              >
                <i class="bi bi-trash-fill"></i>
              </button>
            </li>
          </ul>

          <div class="mt-4 border-top pt-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0">Total:</h5>
              <h5 class="mb-0 text-success">${{ total }}</h5>
            </div>
            <button class="btn btn-outline-danger w-100" @click="clearCart">
              <i class="bi bi-cart-dash me-2"></i>Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useCart } from "@/stores/cartStore";
import { Offcanvas } from "bootstrap";

export default {
  name: "CartOffcanvas",
  setup() {
    const { state, removeItem, clearCart, total } = useCart();
    const cartOffcanvasRef = ref(null);

    let offcanvasInstance = null;

    const showCart = () => {
      if (!offcanvasInstance) {
        offcanvasInstance = new Offcanvas(cartOffcanvasRef.value);
      }
      offcanvasInstance.show();
    };

    onMounted(() => {});

    return {
      state,
      removeItem,
      clearCart,
      total,
      cartOffcanvasRef,
      showCart,
    };
  },
};
</script>

<style scoped>
.offcanvas {
  width: 350px;
}
</style>
