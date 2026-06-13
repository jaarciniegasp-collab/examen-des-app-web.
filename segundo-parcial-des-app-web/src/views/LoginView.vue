<template>
  <div class="login-bg">
    <div class="login-card">
      <h3 class="text-center mb-4">
        <i class="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
      </h3>

      <div class="mb-3">
        <label class="form-label">Usuario</label>
        <input
          v-model="usuario"
          class="form-control"
          placeholder="Usuario"
          @keyup.enter="$refs.clave.focus()"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input
          v-model="clave"
          ref="clave"
          type="password"
          class="form-control"
          placeholder="Contraseña"
          @keyup.enter="login"
        />
      </div>

      <button
        class="btn btn-primary w-100"
        @click="login"
        :disabled="cargando"
      >
        <span
          v-if="cargando"
          class="spinner-border spinner-border-sm me-2"
        ></span>
        Entrar
      </button>

      <AlertMessage
        class="mt-3"
        :show="alert.show"
        :message="alert.message"
        :type="alert.type"
        @close="alert.show = false"
      />
    </div>
  </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue'

export default {
  name: 'LoginView',

  components: {
    AlertMessage
  },

  data() {
    return {
      usuario: '',
      clave: '',
      cargando: false,
      alert: {
        show: false,
        message: '',
        type: 'danger'
      }
    }
  },

  methods: {
    showAlert(message, type) {
      this.alert = {
        show: true,
        message,
        type
      }

      setTimeout(() => {
        this.alert.show = false
      }, 3000)
    },

    async login() {
      if (!this.usuario || !this.clave) {
        this.showAlert('Complete todos los campos', 'warning')
        return
      }

      this.cargando = true

      try {
        // Usuario quemado
        if (
          this.usuario === 'admin' &&
          this.clave === '1234'
        ) {
          const user = {
            id: 1,
            username: 'admin'
          }

          const token = btoa(
            `${user.username}:${Date.now()}`
          )

          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))

          this.showAlert('Ingreso exitoso', 'success')

          setTimeout(() => {
            this.$router.push('/dashboard')
          }, 600)
        } else {
          this.showAlert(
            'Usuario o contraseña incorrectos',
            'danger'
          )
        }
      } catch (error) {
        this.showAlert(
          'Error al iniciar sesión',
          'danger'
        )
      } finally {
        this.cargando = false
      }
    }
  }
}
</script>

<style scoped>
.login-bg {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0e162f, #2563eb);
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  width: 380px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}
</style>