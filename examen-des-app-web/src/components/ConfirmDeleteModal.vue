<template>
  <div class="modal fade" tabindex="-1" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>Confirmar Eliminación
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          ¿Seguro que deseas eliminar
          <strong>{{ itemName }}</strong>?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger" @click="$emit('confirm')" :disabled="deleting">
            <span v-if="deleting" class="spinner-border spinner-border-sm me-2"></span>
            <i v-else class="bi bi-trash-fill me-1"></i>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  name: 'ConfirmDeleteModal',
  props: {
    itemName: { type: String, default: '' },
    deleting: { type: Boolean, default: false }
  },
  emits: ['confirm'],
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