import { defineStore } from 'pinia'
import { 
  auth, 
  registerUser, 
  loginUser, 
  logoutUser,
  loginWithGoogle 
} from '@/services/firebase'
import { User } from 'firebase/auth'
import type { AuthState, UserData } from '@/services/types'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null
  }),

  actions: {
    async register(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const userCredential = await registerUser(email, password)
        this.user = userCredential.user
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const userCredential = await loginUser(email, password)
        this.user = userCredential.user
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async googleLogin() {
      this.loading = true
      this.error = null
      try {
        const userCredential = await loginWithGoogle()
        this.user = userCredential.user
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        await logoutUser()
        this.user = null
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    setUser(user: User | null) {
      this.user = user
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user
  }
})