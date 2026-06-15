import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProductListView from '@/views/ProductListView.vue'
import UserListView from '@/views/UserListView.vue'

// Importa los nuevos componentes de categorías
import CuidadoPersonal from '@/components/CuidadoPersonal.vue'
import Dulces from '@/components/Dulces.vue'
import Lacteos from '@/components/Lacteos.vue'
import Licores from '@/components/Licores.vue'
import Viveres from '@/components/Viveres.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserListView,
    meta: { requiresAuth: true }
  },
  // Nuevas rutas de categorías
  {
    path: '/cuidado-personal',
    name: 'CuidadoPersonal',
    component: CuidadoPersonal,
    meta: { requiresAuth: true }
  },
  {
    path: '/dulces',
    name: 'Dulces',
    component: Dulces,
    meta: { requiresAuth: true }
  },
  {
    path: '/lacteos-y-huevos',
    name: 'Lacteos',
    component: Lacteos,
    meta: { requiresAuth: true }
  },
  {
    path: '/licores',
    name: 'Licores',
    component: Licores,
    meta: { requiresAuth: true }
  },
  {
    path: '/viveres',
    name: 'Viveres',
    component: Viveres,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/')
  } else if (to.path === '/' && token) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router