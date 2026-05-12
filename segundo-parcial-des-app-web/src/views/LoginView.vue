<template>
  <div class="login-bg">
    <div class="login-card">

      <h2 class="text-center mb-3 title">
        {{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}
      </h2>

      <!-- Usuario -->
      <div class="mb-3">
        <input
          v-model="username"
          type="text"
          ref="usuario"
          class="form-control input-style"
          tabindex="1"
          @keyup.enter="$refs.contrasena.focus()" 
          placeholder="Usuario"
        />
      </div>

      <!-- Contraseña -->
      <div class="mb-3">
        <input
          v-model="password"
          ref="contrasena"
          type="password"
          class="form-control input-style"
          tabindex="2"
          placeholder="Contraseña"
          @keyup.enter="isLogin ? login() : register()"
        />
      </div>

      <button
        class="btn btn-main w-100 mb-2"
        @click="isLogin ? login() : register()"
        tabindex="3"
      >
        {{ isLogin ? 'Entrar' : 'Crear cuenta' }}
      </button>

      <p class="text-center toggle-text" @click="toggleMode">
        {{ isLogin
          ? '¿No tienes cuenta? Regístrate'
          : '¿Ya tienes cuenta? Inicia sesión' }}
      </p>
    </div>

    <!-- ALERTA ABAJO -->
    <div v-if="alert.show" :class="['toast-alert', alert.type]">
      {{ alert.message }}
    </div>

  </div>
</template>

<script>
import usersData from '@/data/users.json'

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      isLogin: true,
      users: [...usersData],
      alert: {
        show: false,
        message: '',
        type: ''
      }
    }
  },
  methods: {
    showAlert(msg, type) {
      this.alert.message = msg
      this.alert.type = type
      this.alert.show = true

      setTimeout(() => {
        this.alert.show = false
      }, 2500)
    },

    toggleMode() {
      this.isLogin = !this.isLogin
      this.username = ''
      this.password = ''
    },

    login() {
      if (!this.username || !this.password) {
        this.showAlert('Complete todos los campos', 'warning')
        return
      }

      const user = this.users.find(
        u => u.username === this.username && u.password === this.password
      )

      if (!user) {
        this.showAlert('Usuario o contraseña incorrectos', 'danger')
        return
      }

      localStorage.setItem('user', JSON.stringify(user))
      this.showAlert('Ingreso exitoso', 'success')

      setTimeout(() => {
        this.$router.push('/dashboard')
      }, 1000)
    },

    register() {
      if (!this.username || !this.password) {
        this.showAlert('Complete todos los campos', 'warning')
        return
      }

      const exists = this.users.find(u => u.username === this.username)
      if (exists) {
        this.showAlert('El usuario ya existe', 'danger')
        return
      }

      this.users.push({
        id: this.users.length + 1,
        username: this.username,
        password: this.password
      })

      this.showAlert('Usuario registrado correctamente', 'success')
      this.toggleMode()
    }
  }
}
</script>

<style scoped>
.login-bg {
  height: 100vh;
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 18px;
  width: 380px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  animation: fadeIn 0.5s ease;
}

.title {
  color: #1e3a8a;
  font-weight: bold;
}

.input-style {
  padding: 12px;
  border-radius: 10px;
}

.btn-main {
  background: #2563eb;
  color: white;
  border-radius: 10px;
  padding: 12px;
  font-weight: bold;
  border: none;
}

.btn-main:hover {
  background: #1e40af;
}

.toggle-text {
  color: #2563eb;
  cursor: pointer;
  font-size: 14px;
}

.toggle-text:hover {
  text-decoration: underline;
}

/* ALERTA ABAJO */
.toast-alert {
  position: fixed;
  bottom: 30px;
  background: white;
  padding: 12px 25px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  font-weight: 500;
  animation: slideUp 0.4s ease;
}

.toast-alert.success { border-left: 6px solid #22c55e; }
.toast-alert.danger { border-left: 6px solid #ef4444; }
.toast-alert.warning { border-left: 6px solid #f59e0b; }

@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>