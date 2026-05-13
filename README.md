1.Nuestro negocio  es un micromercado de barrio que vende productos básicos de l canasta familiar . El objetivo de la aplicación es mostrar un catálogo de productos  para facilitar la compra al usuario.
3.Implementamos la modularización separando la interfaz en componentes reutilizables como `SidebarComponent` y `NavbarComponent`, que encapsulan la navegación y la barra superior; las vistas principales (`LoginView`, `DashboardView`, `ProductView`) están en la carpeta `views` y cada una representa una pantalla completa; y en el archivo de rutas (`router/index.js`) definí las URLs con sus respectivos componentes y metadatos (como `hideNavbar` para ocultar la barra en login), usando `router-link` y `$router.push()` para la navegación entre ellas sin recargar la página.
4.agregarProducto() {
  if (!this.producto.nombre || !this.producto.precio) {
    alert("Completa los campos");
    return;
  }
  const nuevoProducto = { ...this.producto, id: Date.now() };
  this.productos.push(nuevoProducto);
  this.guardarProductos();   
  this.limpiarFormulario();
},.

<button
  class="btn btn-main w-100 mb-2"
  @click="isLogin ? login() : register()"
>
  {{ isLogin ? "Entrar" : "Crear cuenta" }}
</button>


<input
  v-model="password"
  ref="contrasena"
  type="password"
  @keyup.enter="isLogin ? login() : register()"
/>


<p class="text-center toggle-text" @click="toggleMode">
  {{ isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión" }}
</p>

0665e60 (HEAD -> juan-jaime, origin/main, origin/HEAD) Merge pull request #21 from jaarciniegasp-collab/shairek-barbosa
7821fab fix: corrige bug en el login
6cb2f39 Merge pull request #20 from jaarciniegasp-collab/jorge-arciniegas
1558796 fix: corrige bug en el login
c19fdfb Merge pull request #19 from jaarciniegasp-collab/juan-jaime
70c6f17 (origin/juan-jaime) terminacion productos
1b38106 Merge pull request #18 from jaarciniegasp-collab/jorge-arciniegas
8634b52 fix: corrige bug en el login
