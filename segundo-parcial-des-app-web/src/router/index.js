import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'
import Viveres from '@/components/Viveres.vue'
import Licor from '@/components/Licor.vue'
import Lacteo from '@/components/Lacteo.vue'
import Dulces from '@/components/Dulces.vue'
import Cuidado from '@/components/Cuidado.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      hideNavbar: true
    }
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },

  {
    path: '/productos',
    name: 'productos',
    component: ProductView
  },

  {
    path: '/salida',
    name: 'salida',
    component: LoginView,
    meta: {
      hideNavbar: true
    }
  },
  {
    path:'/viveres',
    name:'viveres',
    component:Viveres,
  },
  {
    path:'/licores',
    name:'licores',
    component:Licor,
  },
  {
    path:'/lacteos',
    name:'lacteos',
    component:Lacteo,
  },
  {
    path:'/dulces',
    name:'dulces',
    component:Dulces,
  },
  {
    path:'/cuidado',
    name:'cuidado',
    component:Cuidado,
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router