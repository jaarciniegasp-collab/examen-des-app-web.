<template>
  <div class="productos-container">
    <h1 class="text-center mb-4">Productos</h1>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else>
      <div
        v-for="(productos, categoria) in productosAgrupados"
        :key="categoria"
      >
        <h2 class="mt-4 mb-3 text-capitalize">{{ categoria }}</h2>
        <div class="row">
          <div
            v-for="producto in productos"
            :key="producto.id"
            class="col-12 col-md-6 col-lg-3 mb-4"
          >
            <div class="card shadow border-0 h-100">
              <img
                :src="
                  producto.image ||
                  'https://via.placeholder.com/300x200?text=Sin+imagen'
                "
                class="card-img-top mx-auto mt-3"
                style="height: 10rem; width: 10rem; object-fit: cover"
                :alt="producto.name"
              />
              <div class="card-body text-center d-flex flex-column">
                <h5 class="card-title fs-6">{{ producto.name }}</h5>
                <p class="card-text fs-6 text-muted" style="min-height: 2.5rem">
                  {{ producto.description }}
                </p>
                <p class="card-text fs-5 text-danger mt-auto">
                  <strong>${{ producto.price }}</strong>
                </p>

                <!-- Botón dinámico -->
                <button
                  v-if="!isInCart(producto.id)"
                  class="btn btn-primary"
                  @click="addToCartHandler(producto)"
                >
                  <i class="bi bi-cart-plus me-1"></i> Añadir al Carrito
                </button>
                <button
                  v-else
                  class="btn btn-danger"
                  @click="removeFromCartHandler(producto.id)"
                >
                  <i class="bi bi-trash-fill me-1"></i> Eliminar del carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="Object.keys(productosAgrupados).length === 0"
        class="text-center text-muted"
      >
        No hay productos disponibles.
      </div>
    </div>
  </div>
</template>

<script>
import productService from "@/services/productService";
import { useCart } from "@/stores/cartStore";

export default {
  name: "ProductCardComponent",
  props: {
    categoriaFiltro: {
      type: String,
      default: "",
    },
  },
  setup() {
    const { addItem, removeItem, isInCart } = useCart();

    const addToCartHandler = (producto) => {
      addItem({
        id: producto.id,
        name: producto.name,
        price: producto.price,
        category: producto.category,
        image: producto.image,
      });
    };

    const removeFromCartHandler = (productId) => {
      removeItem(productId);
    };

    return {
      addToCartHandler,
      removeFromCartHandler,
      isInCart,
    };
  },
  data() {
    return {
      products: [],
      loading: true,
    };
  },
  computed: {
    productosAgrupados() {
      const normalizar = (str) =>
        (str || "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim();

      const filtrados = this.categoriaFiltro
        ? this.products.filter(
            (p) => normalizar(p.category) === normalizar(this.categoriaFiltro),
          )
        : this.products;

      return filtrados.reduce((grupos, producto) => {
        const cat = producto.category?.toLowerCase() || "sin categoría";
        if (!grupos[cat]) grupos[cat] = [];
        grupos[cat].push(producto);
        return grupos;
      }, {});
    },
  },
  async mounted() {
    try {
      const response = await productService.getAllProducts();
      this.products = response.data;
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.productos-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
.card {
  border-radius: 12px;
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-3px);
}
</style>
