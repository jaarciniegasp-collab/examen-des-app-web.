<template>
  <div class="container mt-4">
    <h2 class="mb-4">Gestión de Productos</h2>

    <!-- FORMULARIO -->
    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <h4 class="mb-3">
          {{ editando ? "Editar Producto" : "Agregar Producto" }}
        </h4>

        <div class="row">
          <div class="col-md-3 mb-2">
            <input
              v-model="producto.nombre"
              type="text"
              class="form-control"
              placeholder="Nombre del producto"
            />
          </div>

          <div class="col-md-2 mb-2">
            <input
              v-model="producto.precio"
              type="number"
              class="form-control"
              placeholder="Precio"
            />
          </div>

          <div class="col-md-3 mb-2">
            <input
              v-model="producto.categoria"
              type="text"
              class="form-control"
              placeholder="Categoría"
            />
          </div>

          <div class="col-md-4 mb-2">
            <input
              v-model="producto.descripcion"
              type="text"
              class="form-control"
              placeholder="Descripción"
            />
          </div>
        </div>

        <!-- BOTONES -->
        <button
          v-if="!editando"
          @click="agregarProducto"
          class="btn btn-success mt-2"
        >
          Agregar Producto
        </button>

        <button v-else @click="actualizarProducto" class="btn btn-warning mt-2">
          Actualizar Producto
        </button>
      </div>
    </div>

    <!-- TABLA -->
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in productos" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nombre }}</td>
          <td>${{ item.precio }}</td>
          <td>{{ item.categoria }}</td>

          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="editarProducto(item)"
            >
              Editar
            </button>

            <button
              class="btn btn-danger btn-sm me-2"
              @click="eliminarProducto(item.id)"
            >
              Eliminar
            </button>

            <button class="btn btn-info btn-sm" @click="verDetalles(item)">
              Ver detalles
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import productosJSON from "@/data/products.json";

export default {
  name: "ProductView",

  data() {
    return {
      productos: [],

      producto: {
        id: null,
        nombre: "",
        precio: "",
        categoria: "",
        descripcion: "",
      },

      editando: false,
    };
  },

  mounted() {
    this.cargarProductos();
  },

  methods: {
    // CARGAR PRODUCTOS
    cargarProductos() {
      const datos = localStorage.getItem("productos");

      if (!datos) {
        localStorage.setItem("productos", JSON.stringify(productosJSON));

        this.productos = productosJSON;
      } else {
        this.productos = JSON.parse(datos);
      }
    },

    // CREATE
    agregarProducto() {
      if (!this.producto.nombre || !this.producto.precio) {
        alert("Completa los campos");
        return;
      }

      const nuevoProducto = {
        ...this.producto,
        id: Date.now(),
      };

      this.productos.push(nuevoProducto);

      this.guardarProductos();

      this.limpiarFormulario();
    },

    // GUARDAR LOCALSTORAGE
    guardarProductos() {
      localStorage.setItem("productos", JSON.stringify(this.productos));
    },

    // EDITAR
    editarProducto(item) {
      this.producto = { ...item };

      this.editando = true;
    },

    // UPDATE
    actualizarProducto() {
      const index = this.productos.findIndex((p) => p.id === this.producto.id);

      if (index !== -1) {
        this.productos[index] = {
          ...this.producto,
        };

        this.guardarProductos();

        this.limpiarFormulario();

        this.editando = false;
      }
    },

    // DELETE
    eliminarProducto(id) {
      const confirmar = confirm("¿Seguro que deseas eliminar este producto?");

      if (confirmar) {
        this.productos = this.productos.filter((p) => p.id !== id);

        this.guardarProductos();
      }
    },

    // VER DETALLES
    verDetalles(producto) {
      alert(
        `Nombre: ${producto.nombre}
Precio: $${producto.precio}
Categoría: ${producto.categoria}
Descripción: ${producto.descripcion}`,
      );
    },

    // LIMPIAR
    limpiarFormulario() {
      this.producto = {
        id: null,
        nombre: "",
        precio: "",
        categoria: "",
        descripcion: "",
      };
    },
  },
};
</script>
