import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// importaciones que ayudan a deplegar la informacion en una lista dinamica 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // <--- Esto es clave

createApp(App)
  .use(router)
  .mount('#app')
  