<template>
  <div class="background">

    <transition name="fade" mode="out-in">
      <v-sheet class="bg-transparent pa-12" height="100vh"
    width="100vw" rounded>

     <v-img
            :src="logo"
            alt="Logo SocialApp"
            max-width="180"
            max-height="180"
            class="mx-auto mb-2"
          />
    <div class="text center mb-8">
      <div class="gradient-title text-h2 font-weight-black text-white mb2">
        Social Chat
      </div>
      <div class="subtitle-gradient text-h5 font-weight-light text-white text-opacity-80">
        Conéctate con tus amigos
        </div>
        <div class="accent-line mt-4" ></div>
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
        :loading="loading"
        color="#fca311"
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
<div class="text center mt4">
          <p class="text-body-2">
            No tienes cuenta?
            <router-link 
            :to="{name: 'register'}"
            class="text-primary text-decoration-none font-weight-bold ml-1"
            >Click aqui para registarte</router-link>
            
          </p>
        </div>
        <br>
        </v-card>
        
    </v-sheet>
    </transition>
    <router-view />
</div>
</template>


<script lang="ts" setup>
import { ref, } from 'vue'
import { useRouter } from 'vuetify/lib/composables/router'
import { useAuthStore } from '@/stores/auth'
import { VTextField } from 'vuetify/lib/components'
import logo from '@/assets/icon/logo.png'

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
  
  try {
    loading.value = true 
    if (!form.value) return
  
  const result = await authStore.login(email.value, password.value)

  if(result.success){
    router.push({name: 'dashboard'})
  }


  } catch (error) {
    console.log('error')
  } finally{
    loading.value = false
  }
}

</script>

<style scoped>
  .background{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #000000 0%, #14213d 100%);
  
  }
    .gradient-title {
  background: linear-gradient(135deg, 
    #fca311 0%,       /* Dorado */
    #eb9800 25%,      /* Naranja */
    #FF69B4 50%,      /* Rosa */
    #412677 75%,      /* Púrpura medio */
    #14213d 100%      /* Azul de tu fondo */
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle-gradient{
   background: linear-gradient(135deg, 
    #fca311 0%,       /* Dorado */
    #eb9800 25%,      /* Naranja */
    #FF69B4 50%,      /* Rosa */
    #412677 75%,      /* Púrpura medio */
    #14213d 100%      /* Azul de tu fondo */
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: -2 2px 4px rgba(0, 0, 0, 0.1);
}
    
</style>