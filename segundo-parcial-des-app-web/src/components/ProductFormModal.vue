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
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input v-model="local.name" class="form-control" placeholder="Nombre del producto" />
          </div>
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
          <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea v-model="local.description" rows="3" class="form-control"></textarea>
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
import { reactive, watch } from 'vue'

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
      description: ''
    })

    const reset = () => {
      if (props.product) {
        local.id = props.product.id ?? null
        local.name = props.product.name ?? ''
        local.price = props.product.price ?? null
        local.category = props.product.category ?? ''
        local.description = props.product.description ?? ''
      } else {
        local.id = null
        local.name = ''
        local.price = null
        local.category = ''
        local.description = ''
      }
    }

    watch(() => props.product, reset, { immediate: true })

    const onSubmit = () => {
      emit('submit', { ...local })
    }

    return { local, onSubmit }
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