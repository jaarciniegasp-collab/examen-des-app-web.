<template>
  <div class="container vh-100 d-flex justify-content-center align-items-center">
    <div class="card shadow p-4" style="width: 400px;">
      <h2 class="text-center mb-4">Iniciar Sesión</h2>

      <!-- Alerta -->
      <div
        v-if="errorMessage"
        class="alert alert-danger"
      >
        {{ errorMessage }}
      </div>

      <!-- Usuario -->
      <div class="mb-3">
        <label class="form-label">Usuario</label>
        <input
          v-model="username"
          type="text"
          ref="userInput"
          class="form-control"
          placeholder="Ingrese usuario"
          tabindex="1"
          @keyup.enter="$refs.passInput.focus()" 
        />
        <!-- modificacion 1: nombre del input de usuario ref="userInput 
            modificacion 2: @keyup.enter="$refs.passInput.focus()" al undir enter reenvía el curso al input passInput 
            modificación 3: tabindex="1" da la gerarquia de la tabulación
        -->
      </div>

      <!-- Contraseña -->
      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input
          v-model="password"
          ref="passInput"
          type="password"
          class="form-control"
          placeholder="Ingrese contraseña"
          tabindex="2"
          @keyup.enter="login"
        />
        <!-- modificacion 1: nombre del input de usuario ref="passInput" 
            modificacion 2: @keyup.enter="login" al undir enter lo que hace es que la funcion login se jecute para que no se envie el formulario mal y se valide
            modificación 3: tabindex="2" da la gerarquia de la tabulación
        -->
      </div>

      <!-- Botón -->
      <button
        class="btn btn-primary w-100"
        @click="login"
        tabindex="3"
      >
      <!-- modificación 1: tabindex="3" da la gerarquia de la tabulación-->
        Ingresar
      </button>
    </div>
  </div>
</template>

<script>
import users from '@/data/users.json'

export default {
  name: 'LoginView',

  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },

  methods: {
    login() {
      const user = users.find(
        u =>
          u.username === this.username &&
          u.password === this.password
      )

      if (user) {
        localStorage.setItem(
          'user',
          JSON.stringify(user)
        )

        this.$router.push('/dashboard')
      } else {
        this.errorMessage =
          'Usuario o contraseña incorrectos'
      }
    }
  }
}
</script>