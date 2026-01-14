<template>
   <div class="background">

     <v-sheet color="transparent" class="pa-12" height="100vh"
     width="100vw" rounded>
     <div class="text center mb-8">
      <div class="gradient-title text-h1 font-weight-black text-white mb2">
        Social Chat
      </div>
      <div class="subtitle-gradient text-h5 font-weight-light text-white text-opacity-80">
        Conéctate con tus amigos
        </div>
        <div class="accent-line mt-4" ></div>
      </div>
        <v-card class="mx-auto px-6 py-8" max-width="344">
          
            <v-form
            v-model="form"
        @submit.prevent="onSubmit"
        >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Contrasena"
          clearable
        ></v-text-field>
        <br>
        <v-btn
        :disabled="!form"
        :loading="loading"
        color="success"
        size="large"
        type="submit"
        variant="elevated"
        block
        
        >
            Registrarme
        </v-btn>

        <br>
        
    </v-form>
   
<div class="text center mt4">
          <p class="text-body-2">
            Ya tienes cuenta?
            <router-link 
            :to="{name: 'login'}"
            class="text-primary text-decoration-none font-weight-bold ml-1"
            >Click aqui para iniciar sesion</router-link>

          </p>
        </div>
        <br>
        </v-card>
    </v-sheet>
    
</div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { VTextField } from 'vuetify/lib/components'


const form = ref<boolean>(false)
const email = ref<string | null>('')
const password = ref<string | null>('')
const loading = ref<boolean>(false)

function onSubmit() {
  if (!form.value) return
  loading.value = true
  setTimeout(() => { loading.value = false }, 2000)
}

function required(v: unknown) {
  return !!v || 'field is required'
}


</script>

<style scoped>
 .background{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 }

   .gradient-title {
  background: linear-gradient(135deg, 
    #FFD700 0%,       /* Dorado */
    #FFA500 25%,      /* Naranja */
    #FF69B4 50%,      /* Rosa */
    #412677 75%,      /* Púrpura medio */
    #121831 100%      /* Azul de tu fondo */
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
    
</style>