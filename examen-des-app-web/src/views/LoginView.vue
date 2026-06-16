<template>
  <div class="login-bg">
    <div class="login-card">

      <!-- LOGIN -->
      <div v-if="!mostrarRegistro">
        <h2 class="text-center mb-4 title">
          <i class="bi bi-person-circle me-2"></i>
          Iniciar Sesión
        </h2>

        <div class="mb-3 input-group">
          <span class="input-group-text">
            <i class="bi bi-person-fill"></i>
          </span>
          <input
            v-model="username"
            type="text"
            class="form-control input-style"
            placeholder="Usuario"
          />
        </div>

        <div class="mb-3 input-group">
          <span class="input-group-text">
            <i class="bi bi-lock-fill"></i>
          </span>
          <input
            v-model="password"
            type="password"
            class="form-control input-style"
            placeholder="Contraseña"
            @keyup.enter="login"
          />
        </div>

        <button
          class="btn btn-main w-100"
          @click="login"
          :disabled="cargando"
        >
          <span
            v-if="cargando"
            class="spinner-border spinner-border-sm me-2"
          ></span>

          <i
            v-else
            class="bi bi-box-arrow-in-right me-2"
          ></i>

          Entrar
        </button>

        <div
          v-if="alert.show"
          :class="['mensaje-login', alert.type]"
        >
          <i
            :class="{
              'bi bi-check-circle-fill': alert.type === 'success',
              'bi bi-exclamation-triangle-fill': alert.type === 'danger',
              'bi bi-exclamation-circle-fill': alert.type === 'warning'
            }"
            class="me-2"
          ></i>
          {{ alert.message }}
        </div>

        <p class="text-center mt-4">
          ¿No tienes cuenta?
          <a href="#" @click.prevent="mostrarRegistro = true">
            Regístrate aquí
          </a>
        </p>
      </div>

      <!-- REGISTRO -->
      <div v-else>
        <h2 class="text-center mb-4 title">
          <i class="bi bi-person-plus-fill me-2"></i>
          Registrarse
        </h2>

        <div class="mb-3 input-group">
          <span class="input-group-text">
            <i class="bi bi-person-fill-add"></i>
          </span>
          <input
            v-model="nuevoUsuario"
            type="text"
            class="form-control input-style"
            placeholder="Nuevo usuario"
          />
        </div>

        <div class="mb-3 input-group">
          <span class="input-group-text">
            <i class="bi bi-shield-lock-fill"></i>
          </span>
          <input
            v-model="nuevaPassword"
            type="password"
            class="form-control input-style"
            placeholder="Nueva contraseña"
            @keyup.enter="registrar"
          />
        </div>

        <button
          class="btn btn-main w-100"
          @click="registrar"
        >
          <i class="bi bi-person-check-fill me-2"></i>
          Registrarse
        </button>

        <div
          v-if="alert.show"
          :class="['mensaje-login', alert.type]"
        >
          <i
            :class="{
              'bi bi-check-circle-fill': alert.type === 'success',
              'bi bi-exclamation-triangle-fill': alert.type === 'danger',
              'bi bi-exclamation-circle-fill': alert.type === 'warning'
            }"
            class="me-2"
          ></i>
          {{ alert.message }}
        </div>

        <button
          class="btn btn-secondary w-100 mt-3"
          @click="mostrarRegistro = false"
        >
          <i class="bi bi-arrow-left-circle-fill me-2"></i>
          Volver al Login
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import userService from "@/services/userService";

export default {
  name: "LoginView",

  data() {
    return {
      username: "",
      password: "",

      nuevoUsuario: "",
      nuevaPassword: "",

      mostrarRegistro: false,
      cargando: false,

      alert: {
        show: false,
        message: "",
        type: "success"
      }
    };
  },

  methods: {
    showAlert(message, type) {
      this.alert = {
        show: true,
        message,
        type
      };

      setTimeout(() => {
        this.alert.show = false;
      }, 3000);
    },

    async login() {
      if (!this.username || !this.password) {
        this.showAlert("Complete todos los campos", "warning");
        return;
      }

      this.cargando = true;

      try {
        const res = await userService.getAllUsers();

        const usuario = res.data.find(
          u =>
            u.username === this.username &&
            u.password === this.password
        );

        if (!usuario) {
          this.showAlert(
            "Usuario o contraseña incorrectos",
            "danger"
          );
          return;
        }

        const token = btoa(
          `${usuario.username}:${Date.now()}`
        );

        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify(usuario)
        );

        this.showAlert(
          "Ingreso exitoso",
          "success"
        );

        setTimeout(() => {
          this.$router.push("/dashboard");
        }, 1000);

      } catch (error) {
        console.error(error);
        this.showAlert(
          "Error al conectar con la API",
          "danger"
        );
      } finally {
        this.cargando = false;
      }
    },

    async registrar() {
      if (!this.nuevoUsuario || !this.nuevaPassword) {
        this.showAlert(
          "Complete todos los campos",
          "warning"
        );
        return;
      }

      try {
        const usuarios = await userService.getAllUsers();

        const existe = usuarios.data.find(
          u => u.username === this.nuevoUsuario
        );

        if (existe) {
          this.showAlert(
            "El usuario ya existe",
            "danger"
          );
          return;
        }

        await userService.createUser({
          username: this.nuevoUsuario,
          password: this.nuevaPassword
        });

        this.showAlert(
          "Usuario registrado correctamente",
          "success"
        );

        this.nuevoUsuario = "";
        this.nuevaPassword = "";

        setTimeout(() => {
          this.mostrarRegistro = false;
        }, 1500);

      } catch (error) {
        console.error(error);
        this.showAlert(
          "Error al registrar usuario",
          "danger"
        );
      }
    }
  }
};
</script>

<style scoped>
.login-bg {
  height: 100vh;
  background: linear-gradient(135deg, #0e162f, #2563eb);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  background: white;
  padding: 40px;
  width: 420px;
  border-radius: 18px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.title {
  color: #1e3a8a;
  font-weight: bold;
}

.input-style {
  padding: 12px;
}

.input-group-text {
  background: #2563eb;
  color: white;
  border: none;
  min-width: 50px;
  justify-content: center;
}

.btn-main {
  background: #2563eb;
  color: white;
  border: none;
  font-weight: bold;
  padding: 10px;
}

.btn-main:hover {
  background: #1d4ed8;
  color: white;
}

.mensaje-login {
  margin-top: 15px;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
}

.mensaje-login.success {
  background: #dcfce7;
  color: #166534;
}

.mensaje-login.danger {
  background: #fee2e2;
  color: #991b1b;
}

.mensaje-login.warning {
  background: #fef3c7;
  color: #92400e;
}

a {
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>