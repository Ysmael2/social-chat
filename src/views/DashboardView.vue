<template>
  <div class="background">
    <!-- Drawer lateral permanente en desktop, temporal en mobile -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="isDesktop"
      :temporary="!isDesktop"
      width="280"
      class="main-drawer"
    >
      <!-- Sección superior del drawer (Logo y búsqueda) -->
      <div class="drawer-header pa-4 border-bottom rounded-lg">
        <!-- Logo -->
        <div class="d-flex align-center mb-4">
          <v-container icon size="large" color="primary" class="mr-2">
             <v-img
            :src="logo"
            alt="Logo SocialApp"
            max-width="180"
            max-height="180"
            class="mx-auto mb-2"
          />
          </v-container>
          <span class="text-h6 font-weight-bold">TecnoChat</span>
        </div>

        <!-- Búsqueda en drawer -->
        <v-text-field
          v-model="search"
          placeholder="Buscar en TecnoChat..."
          variant="outlined"
          density="compact"
          prepend-inner-icon="mdi-magnify"
          hide-details
          @keyup.enter="performSearch"
          class="search-field-drawer"
        ></v-text-field>
      </div>

      <!-- Menú de navegación principal -->
      <v-list nav density="compact">
        <v-list-item
          :to="{ name: 'home' }"
          prepend-icon="mdi-home"
          title="Inicio"
          :active="$route.name === 'home'"
          active-class="active-menu-item"
        ></v-list-item>
        
        <v-list-item
          :to="{ name: 'friends' }"
          prepend-icon="mdi-account-group"
          title="Amigos"
          :active="$route.name === 'friends'"
          active-class="active-menu-item"
        >
          <template v-slot:append>
            <v-badge dot color="error" inline></v-badge>
          </template>
        </v-list-item>
        
        <v-list-item
          prepend-icon="mdi-bell"
          title="Notificaciones"
          @click="menu = false"
        >
          <template v-slot:append>
            <v-badge dot color="error" inline></v-badge>
          </template>
        </v-list-item>
        
        <v-list-item
          prepend-icon="mdi-message"
          title="Mensajes"
          @click="menu = false"
        >
          <template v-slot:append>
            <v-badge content="2" color="error" inline></v-badge>
          </template>
        </v-list-item>
      </v-list>

      <v-divider class="my-2"></v-divider>

      <!-- Menú secundario -->
      <v-list nav density="compact">
        <v-list-item
          prepend-icon="mdi-plus"
          title="Crear"
          @click="menu = false"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-help-circle"
          title="Ayuda"
          @click="menu = false"
        ></v-list-item>
        
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

      <!-- Botón de logout en el drawer -->
      <template v-slot:append>
        <div class="pa-4">
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
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Barra superior fija con hamburger menu y perfil -->
    <div class="dashboard-container">
      <v-app-bar elevation="1" height="56" class="top-bar">
        <!-- Botón hamburger para mostrar/ocultar drawer en mobile -->
        <v-btn
          icon
          size="large"
          class="mr-2"
          @click="toggleDrawer"
          v-if="!isDesktop"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <!-- Logo en mobile -->
        <div class="d-flex align-center" v-if="!isDesktop">
          <span class="text-h6 font-weight-bold d-sm-flex d-none">SocialApp</span>
        </div>

        <!-- Espacio para centrar el contenido en mobile -->
        <div class="flex-grow-1 d-md-none"></div>

        <!-- Botón de búsqueda en mobile -->
        <v-menu
          v-model="searchMenu"
          :close-on-content-click="false"
          location="start"
          :nudge-width="300"
          v-if="!isDesktop"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              size="large"
              v-bind="props"
              class="mr-2"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
          
          <v-card>
            <v-card-text class="pa-4">
              <v-text-field
                v-model="search"
                placeholder="buscar en SocialApp..."
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-magnify"
                hide-details
                @keyup.enter="performSearch"
                autofocus
              ></v-text-field>
              <div class="d-flex justify-end mt-2">
                <v-btn
                  size="small"
                  variant="text"
                  @click="searchMenu = false"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  size="small"
                  color="primary"
                  @click="performSearch"
                  class="ml-2"
                >
                  Buscar
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>

        <!-- Menú de perfil (SIEMPRE visible y en la derecha) -->
        <div class="d-flex align-center ml-auto">
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

    <!-- Contenido principal -->
    <div class="main-content" :class="{ 'with-drawer': isDesktop }">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import logo from '@/assets/icon/logo.png'

const router = useRouter()
const authStore = useAuthStore()
const menu = ref(false)
const search = ref('')
const searchMenu = ref(false)
const drawer = ref(true)
const isDesktop = ref(window.innerWidth >= 960)

// Detectar cambio de tamaño de pantalla
const updateIsDesktop = () => {
  isDesktop.value = window.innerWidth >= 960
  // En desktop, el drawer siempre está abierto
  if (isDesktop.value) {
    drawer.value = true
  }
}

onMounted(() => {
  window.addEventListener('resize', updateIsDesktop)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsDesktop)
})

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

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const performSearch = () => {
  if (search.value.trim()) {
    console.log('Buscando:', search.value)
    // Aquí puedes implementar tu lógica de búsqueda
  }
}

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
  background: linear-gradient(135deg, #14213d 0%, #fca311 100%);
  color: white;
}

.user-info .text-grey {
  color: rgba(255, 255, 255, 0.8) !important;
}

.background {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #14213d 0%, #fca311 150%);
  padding-top: 56px;
}

.dashboard-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: white;
}

/* Contenido principal con ajuste para drawer */
.main-content {
  flex: 1;
  padding: 16px;
}

.main-content.with-drawer {
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

/* Drawer personalizado */
.main-drawer {
  position: fixed !important;
  height: 100vh !important;
  top: 0 !important;
  background-color: white !important;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

/* Header del drawer */
.drawer-header {
  background: linear-gradient(135deg, #14213d 0%, #fca311 100%);
  color: white;
}

.search-field-drawer {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

.search-field-drawer :deep(.v-field__outline) {
  border-color: rgba(255, 255, 255, 0.5) !important;
}

.search-field-drawer :deep(.v-field__prepend-inner) {
  color: white !important;
}

.search-field-drawer :deep(input) {
  color: white !important;
}

.search-field-drawer :deep(.v-field__clearable) {
  color: white !important;
}

.search-field-drawer :deep(.v-field__placeholder) {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Ítem activo en el menú */
.active-menu-item {
  color: #fca311 !important;
  background-color: rgba(252, 163, 17, 0.1) !important;
}

.active-menu-item :deep(.v-list-item__prepend .v-icon) {
  color: #fca311 !important;
}

/* Responsive */
@media (max-width: 960px) {
  .main-content.with-drawer {
    margin-left: 0;
  }
  
  .main-drawer {
    top: 0 !important;
    height: 100vh !important;
    z-index: 1100 !important;
  }
  
  .background {
    padding-top: 56px;
  }
}

@media (max-width: 600px) {
  .top-bar {
    padding: 0 8px;
  }
}

/* Asegurar que el botón de perfil esté siempre a la derecha */
.ml-auto {
  margin-left: auto !important;
}
</style>