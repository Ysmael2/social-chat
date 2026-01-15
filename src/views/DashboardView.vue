<template>
  <div class="background">
    <div class="dashboard-container">
      <v-app-bar elevation="1" height="56" class="top-bar">
        <!-- Sección izquierda: Logo y búsqueda -->
        <div class="d-flex align-center">
          <v-btn icon size="large" class="mr-2" color="primary">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-text-field
            v-model="search"
            placeholder="buscar en SocialApp"
            variant="outlined"
            density="compact"
            prepend-inner-icon="mdi-magnify"
            hide-details
            class="search-field"
            style="width: 300px;"
          ></v-text-field>
        </div>

        <!-- Sección centro: Iconos de navegación -->
        <div class="navigation-icons d-flex justify-center">
          <v-btn
            icon
            size="large"
            :to="{name: 'home'}"
            exact
            class="mx-2"
            :color="$route.name === 'home' ? 'primary' : ''"
          >
            <v-icon size="28">mdi-home</v-icon>
          </v-btn>
          
          <v-btn
            icon
            size="large"
            :to="{name: 'friends'}"
            exact
            class="mx-2"
            :color="$route.name === 'friends' ? 'primary' : ''"
          >
            <v-badge dot color="error">
              <v-icon size="28">mdi-account-group</v-icon>
            </v-badge>
          </v-btn>
          
          <!-- Añade más iconos aquí -->
          <v-btn icon size="large" class="mx-2">
            <v-icon size="28">mdi-bell</v-icon>
            <v-badge dot color="error" class="notification-badge"></v-badge>
          </v-btn>
          
          <v-btn icon size="large" class="mx-2">
            <v-icon size="28">mdi-message</v-icon>
            <v-badge content="3" color="error" class="notification-badge"></v-badge>
          </v-btn>
          
          <v-btn icon size="large" class="mx-2">
            <v-icon size="28"></v-icon>
          </v-btn>
        </div>

        <!-- Sección derecha: Menú de usuario -->
        <div class="d-flex align-center ml-auto">
          <!-- Puedes añadir más elementos aquí antes del menú -->
          <v-btn icon class="mr-2">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          
          <v-btn icon class="mr-2">
            <v-icon>mdi-help-circle</v-icon>
          </v-btn>

          <!-- Menú desplegable -->
          <v-menu
            v-model="menu"
            location="end"
            :close-on-content-click="false"
            :offset-y="true"
          >
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-avatar size="36">
                  <v-img :src="authStore.userPhoto" v-if="authStore.userPhoto" />
                  <span v-else class="text-h6 text-primary">
                    {{ getUserInitials }}
                  </span>
                </v-avatar>
              </v-btn>
            </template>
            
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
                  @click="menu = false"
                ></v-list-item>
                
                <v-list-item
                  :to="{ name: 'settings' }"
                  prepend-icon="mdi-cog"
                  title="Configuración"
                  @click="menu = false"
                ></v-list-item>
                
                <v-list-item
                  prepend-icon="mdi-shield-account"
                  title="Privacidad"
                  @click="menu = false"
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
        </div>
      </v-app-bar>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const menu = ref(false)
const search = ref('')

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
  menu.value = false
  const result = await authStore.logout()
  
  if (result.success) {
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

.background {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

/* Sección de navegación centrada */
.navigation-icons {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* Sección derecha con menú */
.ml-auto {
  margin-left: auto !important;
}

/* Badges para notificaciones */
.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
}

/* Responsive */
@media (max-width: 1200px) {
  .search-field {
    width: 250px !important;
  }
}

@media (max-width: 960px) {
  .search-field {
    width: 200px !important;
  }
  
  .navigation-icons {
    position: static;
    transform: none;
    margin: 0 16px;
  }
  
  .top-bar {
    flex-wrap: wrap;
    height: auto !important;
    padding: 8px;
  }
}

@media (max-width: 600px) {
  .search-field {
    width: 150px !important;
  }
  
  .navigation-icons .mx-2 {
    margin: 0 4px !important;
  }
}
</style>