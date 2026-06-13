<template>
  <table class="table table-bordered table-striped table-hover text-center align-middle">
    <thead class="table-dark">
      <tr>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Categoría</th>
        <th>Descripción</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in products" :key="p.id">
        <td>{{ p.name }}</td>
        <td>$ {{ p.price }}</td>
        <td>{{ p.category }}</td>
        <td>{{ p.description }}</td>
        <td>
          <button class="btn btn-warning btn-sm me-2" @click="$emit('edit', p)">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-danger btn-sm" @click="$emit('delete', p)">
            <i class="bi bi-trash-fill"></i>
          </button>
        </td>
      </tr>
      <tr v-if="products.length === 0">
        <td colspan="5">No hay productos registrados</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ProductTable',
  props: ['products']
}
</script>