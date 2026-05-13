<template>
  <div class="container">
    <h1 class="text-center mt-4 mb-4">Lacteos Y Huevos</h1>
    <div class="row">
      <div
        v-for="producto in productosLacteos"
        :key="producto.id"
        class="col-md-3 mb-3 col-12 col-md-6 col-lg-3"
      >
        <div class="card shadow border-0" style="width: 20rem; height: 23rem">
          <img
            :src="producto.imagen"
            class="mx-auto"
            style="height: 10rem; width: 10rem"
            :alt="producto.nombre"
          />
          <div class="card-body text-center" style="height: 2rem">
            <h5 class="card-title fs-6">{{ producto.nombre }}</h5>
            <p class="card-text fs-6" style="height: 2.5rem">
              {{ producto.descripcion }}
            </p>
            <p class="card-text fs-5 text-danger">
              <strong>${{ producto.precio }}</strong>
            </p>
            <a href="#" class="btn btn-primary">Añadir al Carrito</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productosJson from "@/data/products.json";

export default {
  name: "ProductoLacteos",
  computed: {
    productosLacteos() {
      return productosJson.filter((p) => p.categoria === "lacteos");
    },
  },
};
</script>
