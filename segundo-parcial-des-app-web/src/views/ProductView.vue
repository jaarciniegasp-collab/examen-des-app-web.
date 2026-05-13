<template>
  <div class="container mt-4">

    <h2 class="text-center mb-4">
      <i class="bi bi-cart-fill"></i> Gestión de Productos
    </h2>

    <!-- BOTÓN CREAR -->
    <div class="text-end mb-3">
      <button class="btn btn-success" @click="abrirCrear">
        <i class="bi bi-plus-circle"></i> Nuevo Producto
      </button>
    </div>

    <!-- TABLA -->
    <table class="table table-striped table-bordered text-center align-middle">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in productos" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.nombre }}</td>
          <td>$ {{ p.precio }}</td>
          <td>{{ p.stock }}</td>
          <td>
            <button class="btn btn-primary btn-sm me-1" @click="editarProducto(i)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm me-1" @click="eliminarProducto(i)">
              <i class="bi bi-trash"></i>
            </button>
            <button class="btn btn-warning btn-sm" @click="agregarCarrito(p)">
              <i class="bi bi-cart-plus"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL CREAR / EDITAR -->
    <div v-if="mostrarModal" class="modal-backdrop">
      <div class="modal-contenido">
        <h4>{{ editando ? "Editar Producto" : "Nuevo Producto" }}</h4>

        <input v-model="form.nombre" class="form-control mb-2" placeholder="Nombre" />
        <input v-model.number="form.precio" type="number" class="form-control mb-2" placeholder="Precio" />
        <input v-model.number="form.stock" type="number" class="form-control mb-3" placeholder="Stock" />

        <div class="text-end">
          <button class="btn btn-secondary me-2" @click="cerrarModal">Cancelar</button>
          <button class="btn btn-success" @click="guardarProducto">Guardar</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const productos = ref([])
const mostrarModal = ref(false)
const editando = ref(false)
const indexEditar = ref(null)

const form = ref({
  id: null,
  nombre: "",
  precio: 0,
  stock: 0
})

// Cargar desde JSON solo la primera vez
onMounted(async () => {
  if (!localStorage.getItem("productos")) {
    const res = await fetch("/products.json")
    const data = await res.json()
    localStorage.setItem("productos", JSON.stringify(data))
  }
  cargarProductos()
})

function cargarProductos() {
  productos.value = JSON.parse(localStorage.getItem("productos"))
}

function abrirCrear() {
  editando.value = false
  form.value = { id: Date.now(), nombre: "", precio: 0, stock: 0 }
  mostrarModal.value = true
}

function editarProducto(index) {
  editando.value = true
  indexEditar.value = index
  form.value = { ...productos.value[index] }
  mostrarModal.value = true
}

function guardarProducto() {
  if (editando.value) {
    productos.value[indexEditar.value] = form.value
  } else {
    productos.value.push(form.value)
  }
  localStorage.setItem("productos", JSON.stringify(productos.value))
  cerrarModal()
  cargarProductos()
}

function eliminarProducto(index) {
  if (confirm("¿Eliminar producto?")) {
    productos.value.splice(index, 1)
    localStorage.setItem("productos", JSON.stringify(productos.value))
    cargarProductos()
  }
}

function cerrarModal() {
  mostrarModal.value = false
}

function agregarCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || []
  carrito.push(producto)
  localStorage.setItem("carrito", JSON.stringify(carrito))
  alert("Producto agregado al carrito")
}
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-contenido {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
</style>