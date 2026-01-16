import { defineStore } from 'pinia'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const unsubscribeAuth = ref<() => void>(() => {undefined})

  // Computed
  const isAuthenticated = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email || '')
  const userName = computed(() => user.value?.displayName || user.value?.email?.split('@')[0] || 'Invitado')
  const userPhoto = computed(() => user.value?.photoURL || '')
  const userId = computed(() => user.value?.uid || '')

  // Acciones
  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null
      
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false }
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
          displayName: displayName.trim()
        })
        // Recargar el usuario para obtener datos actualizados
        user.value = userCredential.user
      } else {
        user.value = userCredential.user
      }
      
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false }
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
      return { success: false }
    } finally {
      isLoading.value = false
    }
  }
  

  // const resetPassword = async (email: string) => {
  //   try {
  //     isLoading.value = true
  //     error.value = null
      
  //     const auth = getAuth()
  //     await sendPasswordResetEmail(auth, email)
      
  //     return { success: true }
  //   } catch (err: any) {
  //     error.value = getErrorMessage(err.code)
  //     return { success: false }
  //   } finally {
  //     isLoading.value = false
  //   }
  // }

  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    try {
      if (!user.value) throw new Error('Usuario no autenticado')
      
      isLoading.value = true
      error.value = null
      
      await updateProfile(user.value, data)
      // Forzar actualización reactiva
      user.value = { ...user.value }
      
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false }
    } finally {
      isLoading.value = false
    }
  }

  const updateUserEmail = async (newEmail: string, password: string) => {
    try {
      if (!user.value || !user.value.email) throw new Error('Usuario no autenticado')
      
      isLoading.value = true
      error.value = null
      
      // Reautenticar antes de cambiar email
      const credential = EmailAuthProvider.credential(user.value.email, password)
      await reauthenticateWithCredential(user.value, credential)
      
      await updateEmail(user.value, newEmail)
      user.value = { ...user.value }
      
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false }
    } finally {
      isLoading.value = false
    }
  }

  const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!user.value || !user.value.email) throw new Error('Usuario no autenticado')
      
      isLoading.value = true
      error.value = null
      
      // Reautenticar antes de cambiar contraseña
      const credential = EmailAuthProvider.credential(user.value.email, currentPassword)
      await reauthenticateWithCredential(user.value, credential)
      
      await updatePassword(user.value, newPassword)
      
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false }
    } finally {
      isLoading.value = false
    }
  }

  const initAuthListener = () => {
    const auth = getAuth()
    
    // Guardar la función de unsubscribe para limpiar después
    unsubscribeAuth.value = onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      isLoading.value = false
    })
  }

  const cleanupAuthListener = () => {
    if (unsubscribeAuth.value) {
      unsubscribeAuth.value()
      unsubscribeAuth.value = () => undefined
    }
  }

  const clearError = () => {
    error.value = null
  }

  const checkAuth = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      const auth = getAuth()
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser
        unsubscribe()
        resolve(!!firebaseUser)
      })
    })
  }

  // Helper para mensajes de error
  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Usuario deshabilitado',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'El email ya está en uso',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
      'auth/network-request-failed': 'Error de red. Verifica tu conexión',
      'auth/popup-closed-by-user': 'Ventana cerrada por el usuario',
      'auth/requires-recent-login': 'Necesitas iniciar sesión nuevamente',
      'auth/provider-already-linked': 'Este proveedor ya está vinculado',
      'auth/credential-already-in-use': 'Estas credenciales ya están en uso'
    }
    
    return errorMessages[errorCode] || `Error: ${errorCode}`
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
    userId,
    
    // Acciones
    login,
    register,
    logout,

    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    initAuthListener,
    cleanupAuthListener,
    clearError,
    checkAuth
  }
})