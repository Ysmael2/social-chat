import { createRouter, createWebHistory} from 'vue-router'
import AuthRegister from '@/components/auth/AuthRegister.vue'
import DashboardView from '@/views/DashboardView.vue'


const routes = [
  {
    path:'/',
    redirect:'/login'
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
    meta: { requiresAuth: true },
    children: [
    {
      path: '/friends',
      name: 'friends',
      component: ()=> import('../components/FriendsView.vue'),
    meta: { requiresAuth: true }
    },
    {
      path: '/home',
      name: 'home',
      component: ()=> import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
    },
    {
      path: '/notify',
      name: 'notify',
      component: ()=> import('../components/NotificationsView.vue'),
    meta: { requiresAuth: true }
    }

    ]

  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true }
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
