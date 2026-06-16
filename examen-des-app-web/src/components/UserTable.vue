<template>
  <table class="table table-bordered table-striped table-hover text-center align-middle">
    <thead class="table-dark">
      <tr>
        <th>Usuario</th>
        <th>Contraseña</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="u in users" :key="u.id">
        <td>{{ u.username }}</td>
        <td>••••••••</td>
        <td>
          <button class="btn btn-warning btn-sm me-2" @click="$emit('edit', u)">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-danger btn-sm" @click="$emit('delete', u)">
            <i class="bi bi-trash-fill"></i>
          </button>
        </td>
      </tr>
      <tr v-if="users.length === 0">
        <td colspan="3">No hay usuarios registrados</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'UserTable',
  props: ['users']
}
</script>