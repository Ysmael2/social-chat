<template>
<transition name="fade" mode="out-in">
    <v-sheet class="bg-cyan-lighten-4 pa-12" height="100vh"
    width="100vw" rounded>
     <div class="text-center mb-6">
        <v-icon 
          size="64" 
          color="primary" 
          class="mb-2"
        >
          mdi-chat
        </v-icon>
    </div>
      <div class="text-h3 font-weight-bold text-success">
          Social Chat
        </div>
        <div class="text-subtitle-1 text-medium-emphasis mt-2">
          Conéctate con tus amigos
        </div>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-alert
          v-if="authStore.error"
          type="error"
          variant="tonal"
          class="mb-4"
          closable
          @click:close="authStore.clearError()"
        >
          {{ authStore.error }}
        </v-alert>
        <v-form
            v-model="form"
        @submit.prevent="onSubmit"
        >
        <v-text-field
          v-model="email"
          :readonly="authStore.isLoading"
          :rules="[required, emailRule]"
          class="mb-2"
          label="Email"
          type="email"
          clearable
         
          @input="authStore.clearError()"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="authStore.isLoading"
          :rules="[required, minLength]"
          class="mb-2"
          label="Contrasena"
          type="password"
          @input="authStore.clearError()"
        ></v-text-field>
        <br>
        <v-btn
        :disabled="!form || authStore.isLoading"
        :loading="authStore.isLoading"
        color="success"
        size="large"
        type="submit"
        variant="elevated"
        block
        class="mb-2"
        >
            Iniciar Sesion
        </v-btn>

        <br>

    </v-form>
    <v-btn
     
    

    color="primary"
    size="large"
    type="button"
    variant="elevated"
    :to="{ name: 'register' }" 
    >
     Registrarme
    </v-btn>

        </v-card>
        
    </v-sheet>
    </transition>
    <router-view />
</template>


<script lang="ts" setup>
import { ref, onMounted} from 'vue'
import { useRouter } from 'vuetify/lib/composables/router'
import { useAuthStore } from '@/stores/auth'
import { VTextField } from 'vuetify/lib/components'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import DashboardView from '@/views/DashboardView.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref<boolean>(false)
const email = ref<string>('')
const password = ref<string >('')
const loading = ref<boolean>(false)

    //reglas de validacion
const required = (v: any) => !!v || 'Campo requerido'
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'Email inválido'
const minLength = (v: string) => v.length >= 6 || 'Mínimo 6 caracteres'


const onSubmit = async () => {
  if (!form.value) return
  
  const result = await authStore.login(email.value, password.value)

  if(result.success){
    router.push({name: 'dashboard'})
  }
}

onMounted(()=>{
    authStore.initAuthListener()
})
</script>

<style scoped>
    
    
</style>