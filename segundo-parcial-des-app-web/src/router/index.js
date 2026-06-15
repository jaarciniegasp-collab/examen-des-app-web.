import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ProductListView from '@/views/ProductListView.vue'
import UserListView from '@/views/UserListView.vue'

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