<template>
  <SidebarComponent />
  <div class="flex-grow-1 p-4 bg-light">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2><i class="bi bi-people-fill me-2"></i>Usuarios</h2>
      <button class="btn btn-success" @click="abrirCrear">
        <i class="bi bi-plus-lg me-1"></i> Nuevo Usuario
      </button>
    </div>

    <AlertMessage :show="alert.show" :message="alert.message" :type="alert.type" @close="alert.show = false" />

    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary"></div>
    </div>

    <UserTable v-else :users="users" @edit="abrirEditar" @delete="abrirEliminar" />

    <UserFormModal
      ref="formModal"
      :user="usuarioActual"
      :saving="saving"
      :editando="editando"
      @submit="guardar"
    />

    <ConfirmDeleteModal
      ref="deleteModal"
      :item-name="usuarioSeleccionado?.username"
      :deleting="saving"
      @confirm="confirmarEliminar"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import UserTable from '@/components/UserTable.vue'
import UserFormModal from '@/components/UserFormModal.vue'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
import AlertMessage from '@/components/AlertMessage.vue'
import userService from '@/services/userService'

export default {
  components: { SidebarComponent, UserTable, UserFormModal, ConfirmDeleteModal, AlertMessage },
  setup() {
    const users = ref([])
    const loading = ref(false)
    const saving = ref(false)
    const editando = ref(false)
    const usuarioActual = ref(null)
    const usuarioSeleccionado = ref(null)
    const formModal = ref(null)
    const deleteModal = ref(null)
    const alert = ref({ show: false, message: '', type: 'success' })

    const showAlert = (message, type) => {
      alert.value = { show: true, message, type }
      setTimeout(() => { alert.value.show = false }, 3000)
    }

    const load = async () => {
      loading.value = true
      try {
        const res = await userService.getAllUsers()
        users.value = res.data
      } catch (err) {
        showAlert('Error al cargar usuarios', 'danger')
      } finally {
        loading.value = false
      }
    }

    const abrirCrear = () => {
      editando.value = false
      usuarioActual.value = null
      formModal.value.show()
    }

    const abrirEditar = (usuario) => {
      editando.value = true
      usuarioActual.value = usuario
      formModal.value.show()
    }

    const abrirEliminar = (usuario) => {
      usuarioSeleccionado.value = usuario
      deleteModal.value.show()
    }

    const guardar = async (payload) => {
      if (!payload.username || !payload.password) {
        showAlert('Complete todos los campos', 'warning')
        return
      }

      saving.value = true
      try {
        if (editando.value) {
          await userService.updateUser(payload.id, payload)
          showAlert('Usuario actualizado correctamente', 'success')
        } else {
          await userService.createUser(payload)
          showAlert('Usuario creado correctamente', 'success')
        }
        formModal.value.hide()
        await load()
      } catch (err) {
        showAlert('Error al guardar el usuario', 'danger')
      } finally {
        saving.value = false
      }
    }

    const confirmarEliminar = async () => {
      saving.value = true
      try {
        await userService.deleteUser(usuarioSeleccionado.value.id)
        showAlert('Usuario eliminado correctamente', 'success')
        deleteModal.value.hide()
        await load()
      } catch (err) {
        showAlert('Error al eliminar el usuario', 'danger')
      } finally {
        saving.value = false
      }
    }

    onMounted(load)

    return {
      users, loading, saving, editando, usuarioActual, usuarioSeleccionado,
      formModal, deleteModal, alert, abrirCrear, abrirEditar, abrirEliminar, guardar, confirmarEliminar
    }
  }
}
</script>