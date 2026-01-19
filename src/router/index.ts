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
     meta: { guestOnly: true,
      transition: 'fade'
      }
  },
  {
    path: '/register',
    name: 'register',
    component: AuthRegister,
    meta: {
      guestOnly: true,
      transition: 'fade'
    }    
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
    {
      path: 'friends',
      name: 'friends',
      component: ()=> import('../components/FriendsView.vue'),
    meta: { requiresAuth: true }
    },
    {
      path: 'home',
      name: 'home',
      component: ()=> import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
    },
    {
      path: 'notify',
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


router.beforeEach(async (to: any, from: any, next:any) => {
  const {useAuthStore} = await import ('@/stores/auth')
  const authStore = useAuthStore()

  // Esperar a Firebase
 if (!authStore.isAuthReady) {
    authStore.initAuthListener()
    
    // Esperar máximo 2 segundos a que Firebase esté listo
    const maxWaitTime = 2000 // 2 segundos
    const startTime = Date.now()
    
    while (!authStore.isAuthReady && Date.now() - startTime < maxWaitTime) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Redirigiendo al login desde:', to.name)
    return next({ 
      name: 'login',
      query: { redirect: to.fullPath }
    })
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
        console.log('Ya autenticado, redirigiendo al dashboard')
    return next({ name: 'dashboard' })
  }

  next()
})


export default router
