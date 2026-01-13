<template>

    <v-sheet class="bg-cyan-lighten-4 pa-12" rounded>
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
        color="succes"
        size="large"
        type="submit"
        variant="elevated"
        block
        @click="authUser"
        >
            Iniciar Sesion
        </v-btn>
            </v-form>

        </v-card>
    </v-sheet>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { VTextField } from 'vuetify/lib/components'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

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

const authUser = () =>{
    const auth= getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value).then( ()=>{
        alert("exito")
    })
    .catch((error)=>{
        alert("error de login" + error.message)
    })

}
</script>

<style scoped>
</style>