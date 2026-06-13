<template>
  <div class="modal fade" tabindex="-1" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i :class="editando ? 'bi bi-pencil-square' : 'bi bi-plus-lg'" class="me-2"></i>
            {{ editando ? 'Editar Usuario' : 'Nuevo Usuario' }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Usuario</label>
            <input v-model="local.username" class="form-control" placeholder="Nombre de usuario" />
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input v-model="local.password" class="form-control" placeholder="Contraseña" />
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
  name: 'UserFormModal',
  props: {
    user: { type: Object, default: null },
    saving: { type: Boolean, default: false },
    editando: { type: Boolean, default: false }
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const local = reactive({ id: null, username: '', password: '' })

    const reset = () => {
      if (props.user) {
        local.id = props.user.id ?? null
        local.username = props.user.username ?? ''
        local.password = props.user.password ?? ''
      } else {
        local.id = null
        local.username = ''
        local.password = ''
      }
    }

    watch(() => props.user, reset, { immediate: true })

    const onSubmit = () => emit('submit', { ...local })

    return { local, onSubmit }
  },
  data() {
    return { modal: null }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modalRef)
  },
  methods: {
    show() { this.modal.show() },
    hide() { this.modal.hide() }
  }
}
</script>