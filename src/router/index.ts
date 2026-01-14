import { createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AuthRegister from '@/components/auth/AuthRegister.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes = [
  {
    path:'/',
    redirect:'/login'
  },

  
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
    {
    path: '/login',
    name: 'login',
     component: () => import('@/components/auth/AuthLogin.vue'),
     meta: { requiresAuth: false,
      transition: 'fade'
      }
  },
  {
    path: '/register',
    name: 'register',
    component: AuthRegister,
    transition: 'fade'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    transition: 'fade'
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  } ,
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/components/auth/AuthProfile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/components/auth/AuthSettings.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
