import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProductListView from '@/views/ProductListView.vue'
import UserListView from '@/views/UserListView.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginView },
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const logueado = localStorage.getItem('token')

  if (to.meta.requiresAuth && !logueado) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && logueado) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router