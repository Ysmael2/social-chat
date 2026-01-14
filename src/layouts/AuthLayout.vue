<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <!-- Logo -->
        <div class="text-center mb-6">
          <h1 class="text-h4">Social Chat</h1>
          <p class="text-subtitle-1 text-grey">Conéctate con tus amigos</p>
        </div>
        
        <!-- Tarjeta principal -->
        <v-card class="pa-6">
          <!-- Navegación entre login/register -->
          <v-tabs v-model="activeTab" grow class="mb-6">
            <v-tab :to="{ name: 'login' }">
              <v-icon left>mdi-login</v-icon>
              Login
            </v-tab>
            <v-tab :to="{ name: 'sing' }">
              <v-icon left>mdi-account-plus</v-icon>
              Registro
            </v-tab>
          </v-tabs>
          
          <!-- Aquí se renderizan login o register -->
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeTab = ref(0)

// Sincronizar tab con la ruta actual
watch(
  () => route.name,
  (name) => {
    if (name === 'login') activeTab.value = 0
    else if (name === 'sing') activeTab.value = 1
  },
  { immediate: true }
)
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>