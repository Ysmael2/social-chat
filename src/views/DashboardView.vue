<template>
  <div class="background">
    <div class="dashboard-container">
      <v-app-bar elevation="1" height="56" class="top-bar">
        <!-- Sección izquierda: Logo y búsqueda -->
        <div class="d-flex align-center">
          <v-btn icon size="large" class="mr-2 d-none d-sm-flex" color="primary">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>

          <!-- icono de busqueda -->
          <v-menu
            v-model="searchMenu"
            :close-on-content-click="false"
            location="start"
            :nudge-width="300"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                size="large"
                v-bind="props"
                class="mr-sm-2 mr-0 d-md-none"
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

          <!-- Campo de busqueda flexible en desktop -->
          <v-text-field
            v-model="search"
            placeholder="buscar en SocialApp"
            variant="plain"
            density="compact"
            prepend-inner-icon="mdi-magnify"
            hide-details
            class="search-field d-none d-md-flex"
            :style="{ width: searchFieldWidth }"
            @keyup.enter="performSearch"
            @focus="expandSearchField"
            @blur="collapseSearchField"
          ></v-text-field>
        </div>

        <!-- Sección centro: Iconos de navegación - CENTRADOS -->
        <div class="navigation-icons">
          <v-btn
            icon
            size="large"
            :to="{name: 'home'}"
            exact
            class="mx-1"
            :color="$route.name === 'home' ? 'primary' : ''"
          >
            <v-icon size="28">mdi-home</v-icon>
          </v-btn>
          
          <v-btn
            icon
            size="large"
            :to="{name: 'friends'}"
            exact
            class="mx-1"
            :color="$route.name === 'friends' ? 'primary' : ''"
          >
            <v-badge dot color="error">
              <v-icon size="28">mdi-account-group</v-icon>
            </v-badge>
          </v-btn>
          
          <v-btn icon size="large" class="mx-1">
            <v-icon size="28">mdi-bell</v-icon>
            <v-badge dot color="error" class="notification-badge"></v-badge>
          </v-btn>
          
          <v-btn icon size="large" class="mx-1">
            <v-icon size="28">mdi-message</v-icon>
            <v-badge content="2" color="error" class="notification-badge"></v-badge>
          </v-btn>
        </div>

        <!-- Sección derecha: Menú de usuario -->
        <div class="d-flex align-center ml-auto">
          <v-btn icon class="mr-2 d-none d-md-flex">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          
          <v-btn icon class="mr-2 d-none d-md-flex">
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
const searchMenu = ref(false)
const searchFieldWidth = ref('240px')

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

const expandSearchField = () => {
  searchFieldWidth.value = '400px'
}

const collapseSearchField = () => {
  searchFieldWidth.value = '240px'
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
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

/* Sección izquierda */
.d-flex.align-center:first-child {
  flex: 1;
  min-width: 200px;
}

/* Campo de búsqueda flexible */
.search-field {
  transition: width 0.3s ease !important;
  min-width: 200px;
  max-width: 500px;
  background-color: #f0f2f5;
  border-radius: 20px;
}

.search-field :deep(.v-field__outline) {
  border: none;
}

.search-field:focus-within,
.search-field-mobile:focus-within {
  box-shadow: 0 0 0 2px rgba(252, 163, 17, 0.3);
}


/* Sección centro: Iconos de navegación */
.navigation-icons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
  max-width: 400px;
  margin: 0 auto;
}

/* Sección derecha */
.ml-auto {
  flex: 1;
  min-width: 200px;
  display: flex;
  justify-content: flex-end;
}

/* Badges para notificaciones */
.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
}

/* Responsive */
@media (max-width: 1279px) {
  .search-field {
    min-width: 180px;
  }
  
  .navigation-icons {
    max-width: 350px;
  }
}

@media (max-width: 960px) {
  .navigation-icons {
    flex: 1;
    max-width: none;
    justify-content: center;
    margin: 0;
  }
  
  .d-flex.align-center:first-child,
  .ml-auto {
    flex: none;
    min-width: auto;
  }
  
  .d-flex.align-center:first-child {
    justify-content: flex-start;
  }
  
  .ml-auto {
    justify-content: flex-end;
  }
  
  .search-field {
    min-width: 180px;
  }
}

@media (max-width: 768px) {
  .search-field {
    min-width: 150px;
  }
}

@media (max-width: 600px) {
  .navigation-icons {
    flex: 2;
    justify-content: space-around;
  }
  
  .d-flex.align-center:first-child {
    flex: 1;
  }
  
  .ml-auto {
    flex: 1;
    justify-content: flex-end;
  }
  
  .navigation-icons .mx-1 {
    margin: 0 2px !important;
  }
  
  .top-bar {
    padding: 0 8px;
  }
}

/* Efecto hover para botones de navegación */
.navigation-icons .v-btn:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

/* Indicador activo para botones de navegación */
.navigation-icons .v-btn--active {
  position: relative;
}

.navigation-icons .v-btn--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background-color: #fca311;
  border-radius: 3px 3px 0 0;
}
</style>