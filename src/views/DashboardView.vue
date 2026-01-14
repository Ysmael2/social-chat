<template>
  <!-- Botón para abrir menú -->
  <v-btn icon @click="menu = !menu">
    <v-avatar size="36">
      <v-img :src="authStore.userPhoto" v-if="authStore.userPhoto" />
      <span v-else class="text-h6 text-primary">
        {{ getUserInitials }}
      </span>
    </v-avatar>
  </v-btn>

  <!-- Menú desplegable -->
  <v-menu v-model="menu" :close-on-content-click="false">
    <v-card width="320">
      <!-- Información del usuario -->
      <v-card-text class="pa-4 user-info">
        <div class="d-flex align-center">
          <v-avatar size="56" color="primary" class="mr-4">
            <v-img :src="authStore.userPhoto" v-if="authStore.userPhoto" />
            <span v-else class="text-white text-h5">
              {{ getUserInitials }}
            </span>
          </v-avatar>
          <div>
            <div class="text-h6 font-weight-bold">
              {{ authStore.userName || 'Usuario' }}
            </div>
            <div class="text-body-2 text-grey">
              {{ authStore.userEmail }}
            </div>
            <v-chip size="x-small" color="success" class="mt-1">
              <v-icon size="12" class="mr-1">mdi-circle</v-icon>
              Conectado
            </v-chip>
          </div>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Opciones del menú -->
      <v-list density="compact" nav>
        <v-list-item
          :to="{ name: 'profile' }"
          prepend-icon="mdi-account"
          title="Mi Perfil"
        ></v-list-item>
        
        <v-list-item
          :to="{ name: 'settings' }"
          prepend-icon="mdi-cog"
          title="Configuración"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-shield-account"
          title="Privacidad"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- Botón de logout -->
      <v-card-actions class="pa-4">
        <v-btn
          color="error"
          variant="flat"
          prepend-icon="mdi-logout"
          @click="handleLogout"
          :loading="authStore.isLoading"
          :disabled="authStore.isLoading"
          block
        >
          Cerrar Sesión
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const menu = ref(false)

// Obtener iniciales del usuario
const getUserInitials = computed(() => {
  if (authStore.userName) {
    return authStore.userName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }
  return authStore.userEmail
    .split('@')[0]
    .substring(0, 2)
    .toUpperCase()
})

const handleLogout = async () => {
  const result = await authStore.logout()
  
  if (result.success) {
    menu.value = false
    router.push({ name: 'login' })
  }
}
</script>

<style scoped>
.user-info {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-info .text-grey {
  color: rgba(255, 255, 255, 0.8) !important;
}
</style>