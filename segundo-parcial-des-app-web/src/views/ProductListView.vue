<template>
  <SidebarComponent />
  <div class="flex-grow-1 p-4 bg-light">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2><i class="bi bi-box-seam me-2"></i>Productos</h2>
      <button class="btn btn-success" @click="abrirCrear">
        <i class="bi bi-plus-lg me-1"></i> Nuevo Producto
      </button>
    </div>

    <AlertMessage :show="alert.show" :message="alert.message" :type="alert.type" @close="alert.show = false" />

    <input v-model="search" class="form-control mb-3" placeholder="Buscar por nombre..." />

    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary"></div>
    </div>

    <ProductTable
      v-else
      :products="filteredProducts"
      @edit="abrirEditar"
      @delete="abrirEliminar"
    />

    <ProductFormModal
      ref="formModal"
      :product="productoActual"
      :saving="saving"
      :editando="editando"
      @submit="guardar"
    />

    <ConfirmDeleteModal
      ref="deleteModal"
      :item-name="productoSeleccionado?.name"
      :deleting="saving"
      @confirm="confirmarEliminar"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import ProductTable from '@/components/ProductTable.vue'
import ProductFormModal from '@/components/ProductFormModal.vue'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
import AlertMessage from '@/components/AlertMessage.vue'
import productService from '@/services/productService'

export default {
  components: { SidebarComponent, ProductTable, ProductFormModal, ConfirmDeleteModal, AlertMessage },
  setup() {
    const products = ref([])
    const loading = ref(false)
    const saving = ref(false)
    const search = ref('')
    const editando = ref(false)
    const productoActual = ref(null)
    const productoSeleccionado = ref(null)
    const formModal = ref(null)
    const deleteModal = ref(null)
    const alert = ref({ show: false, message: '', type: 'success' })

    const filteredProducts = computed(() =>
      products.value.filter((p) =>
        (p.name ?? '').toLowerCase().includes(search.value.toLowerCase())
      )
    )

    const showAlert = (message, type) => {
      alert.value = { show: true, message, type }
      setTimeout(() => { alert.value.show = false }, 3000)
    }

    const load = async () => {
      loading.value = true
      try {
        const res = await productService.getAllProducts()
        products.value = res.data
      } catch (err) {
        showAlert('Error al cargar productos', 'danger')
      } finally {
        loading.value = false
      }
    }

    const abrirCrear = () => {
      editando.value = false
      productoActual.value = null
      formModal.value.show()
    }

    const abrirEditar = (producto) => {
      editando.value = true
      productoActual.value = producto
      formModal.value.show()
    }

    const abrirEliminar = (producto) => {
      productoSeleccionado.value = producto
      deleteModal.value.show()
    }

    const guardar = async (payload) => {
      if (!payload.name || !payload.price) {
        showAlert('Complete los campos obligatorios', 'warning')
        return
      }

      saving.value = true
      try {
        if (editando.value) {
          await productService.updateProduct(payload.id, payload)
          showAlert('Producto actualizado correctamente', 'success')
        } else {
          await productService.createProduct(payload)
          showAlert('Producto creado correctamente', 'success')
        }
        formModal.value.hide()
        await load()
      } catch (err) {
        showAlert('Error al guardar el producto', 'danger')
      } finally {
        saving.value = false
      }
    }

    const confirmarEliminar = async () => {
      saving.value = true
      try {
        await productService.deleteProduct(productoSeleccionado.value.id)
        showAlert('Producto eliminado correctamente', 'success')
        deleteModal.value.hide()
        await load()
      } catch (err) {
        showAlert('Error al eliminar el producto', 'danger')
      } finally {
        saving.value = false
      }
    }

    onMounted(load)

    return {
      products, filteredProducts, search, loading, saving, editando,
      productoActual, productoSeleccionado, formModal, deleteModal, alert,
      abrirCrear, abrirEditar, abrirEliminar, guardar, confirmarEliminar
    }
  }
}
</script>