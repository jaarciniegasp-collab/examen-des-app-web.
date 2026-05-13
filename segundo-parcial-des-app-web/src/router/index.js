import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '@/views/ProductView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginView,
    //evita que el navbar se coloque en el login 
    meta: {hideNavbar: true}
  },
  {
    path: '/dashboard',
    component: DashboardView
  },
  {
    path:'/productos',
    component: ProductView
  },
  {
    path:'/salida',
    component: LoginView,
    //evita que el navbar se coloque en el login 
    meta: {hideNavbar: true}
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router