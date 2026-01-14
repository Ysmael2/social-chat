import { defineStore } from 'pinia'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const isAuthenticated = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email || '')
  const userName = computed(() => user.value?.displayName || '')
  const userPhoto = computed(() => user.value?.photoURL || '')

  // Acciones
  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      
      return { success: true, user: user.value }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (email: string, password: string, displayName?: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Actualizar perfil si se proporciona displayName
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        })
        // Refrescar el usuario para obtener los datos actualizados
        user.value = { ...userCredential.user, displayName }
      } else {
        user.value = userCredential.user
      }
      
      return { success: true, user: user.value }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      isLoading.value = true
      const auth = getAuth()
      await signOut(auth)
      user.value = null
      error.value = null
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const initAuthListener = () => {
    const auth = getAuth()
    
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
      } else {
        user.value = null
      }
      isLoading.value = false
    })
  }

  const clearError = () => {
    error.value = null
  }

  // Helper para mensajes de error
  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Usuario deshabilitado',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'El email ya está en uso',
      'auth/weak-password': 'La contraseña es muy débil (mínimo 6 caracteres)',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
      'auth/network-request-failed': 'Error de red. Verifica tu conexión',
      'auth/popup-closed-by-user': 'Ventana cerrada por el usuario'
    }
    
    return errorMessages[errorCode] || 'Error desconocido. Intenta nuevamente'
  }

  return {
    // Estado
    user,
    isLoading,
    error,
    
    // Computed
    isAuthenticated,
    userEmail,
    userName,
    userPhoto,
    
    // Acciones
    login,
    register,
    logout,
    initAuthListener,
    clearError
  }
})