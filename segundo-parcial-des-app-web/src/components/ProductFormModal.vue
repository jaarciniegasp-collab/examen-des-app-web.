<template>
  <div class="modal fade" tabindex="-1" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i :class="editando ? 'bi bi-pencil-square' : 'bi bi-plus-lg'" class="me-2"></i>
            {{ editando ? 'Editar Producto' : 'Nuevo Producto' }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <!-- Campo Nombre -->
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input v-model="local.name" class="form-control" placeholder="Nombre del producto" />
          </div>

          <!-- Fila Precio / Categoría -->
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">Precio</label>
              <input v-model.number="local.price" type="number" step="0.01" min="0" class="form-control" />
            </div>
            <div class="col">
              <label class="form-label">Categoría</label>
              <input v-model="local.category" class="form-control" />
            </div>
          </div>

          <!-- Campo Descripción -->
          <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea v-model="local.description" rows="3" class="form-control"></textarea>
          </div>

          <!-- NUEVO: Campo Imagen -->
          <div class="mb-3">
            <label class="form-label">Imagen</label>
            <input
              type="file"
              class="form-control"
              accept="image/*"
              @change="onFileChange"
              ref="fileInput"
            />
            <!-- Vista previa de la imagen actual (si existe) -->
            <div v-if="local.image" class="mt-2">
              <img :src="local.image" alt="Previsualización" class="img-thumbnail" style="max-height: 150px;" />
              <button type="button" class="btn btn-sm btn-outline-danger ms-2" @click="removeImage">
                <i class="bi bi-x-circle"></i> Quitar
              </button>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="onSubmit" :disabled="saving">
            <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import { reactive, watch, ref } from 'vue'

export default {
  name: 'ProductFormModal',
  props: {
    product: { type: Object, default: null },
    saving: { type: Boolean, default: false },
    editando: { type: Boolean, default: false }
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const local = reactive({
      id: null,
      name: '',
      price: null,
      category: '',
      description: '',
      image: ''   // ⬅️ nuevo campo
    })

    const fileInput = ref(null)

    // Reinicia el formulario con los datos del producto (si se edita)
    const reset = () => {
      if (props.product) {
        local.id = props.product.id ?? null
        local.name = props.product.name ?? ''
        local.price = props.product.price ?? null
        local.category = props.product.category ?? ''
        local.description = props.product.description ?? ''
        local.image = props.product.image ?? ''   // ⬅️ carga la imagen existente
      } else {
        local.id = null
        local.name = ''
        local.price = null
        local.category = ''
        local.description = ''
        local.image = ''
      }
      // Limpiar el input file para permitir volver a seleccionar el mismo archivo
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    }

    watch(() => props.product, reset, { immediate: true })

    // Convierte el archivo seleccionado a Base64 y lo asigna a local.image
    const onFileChange = (event) => {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        local.image = e.target.result   // resultado Base64
      }
      reader.readAsDataURL(file)
    }

    // Elimina la imagen actual
    const removeImage = () => {
      local.image = ''
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    }

    const onSubmit = () => {
      emit('submit', { ...local })
    }

    return { local, onSubmit, fileInput, onFileChange, removeImage }
  },
  data() {
    return { modal: null }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modalRef)
  },
  methods: {
    show() {
      this.modal.show()
    },
    hide() {
      this.modal.hide()
    }
  }
}
</script>