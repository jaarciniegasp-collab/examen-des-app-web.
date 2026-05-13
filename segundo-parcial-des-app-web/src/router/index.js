import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router