

<template>
    <br><br>
<div class="friends-container">
    <!-- contenido principal -->
    <v-container fluid>
        <v-row no-gutters justify="center">

            <!-- Columna principal centrada -->
            <v-col cols="12" xl="8" lg="10" md="11" sm="11">
                
                <v-card class="ma-2 ma-md-4" rounded="lg">
                    <v-card-title class="d-flex align-center"> 
                        <v-icon color="primary" class="mr-3">
                            mdi-account-group
                        </v-icon>
                        <span class="text-h5">Amigos</span>
                        
                        <!-- Chip contador al lado del título -->
                        <v-chip color="primary" variant="outlined" class="ml-3">
                            {{ totalFriends }} amigos
                        </v-chip>
                    </v-card-title>
                    
                    <v-divider class="mx-4"></v-divider>
                    
                    <!-- Filtros centrados -->
                    <v-card-text class="pa-4">
                        <div class="text-center mb-4">
                            <div class="text-subtitle-1 text-grey mb-2">Filtrar por estado</div>
                            <v-chip-group 
                                v-model="selectedFilter" 
                                center-active
                                class="justify-center"
                                mandatory
                            >
                                <v-chip filter value="all" :selected="selectedFilter === 'all'">
                                    <v-icon start>mdi-account-group</v-icon>
                                    Todos
                                </v-chip>
                                <v-chip filter value="pending" :selected="selectedFilter === 'pending'">
                                    <v-icon start>mdi-clock</v-icon>
                                    Pendientes
                                    <v-chip v-if="pendingRequests.length > 0" color="red" size="x-small" class="ml-1">
                                        {{ pendingRequests.length }}
                                    </v-chip>
                                </v-chip>
                                <v-chip filter value="accepted" :selected="selectedFilter === 'accepted'">
                                    <v-icon start>mdi-check</v-icon>
                                    Aceptados
                                </v-chip>
                                <v-chip filter value="rejected" :selected="selectedFilter === 'rejected'">
                                    <v-icon start>mdi-close</v-icon>
                                    Rechazados
                                </v-chip>
                            </v-chip-group>
                        </div>

                        <!-- Contenido según filtro -->
                        <div class="content-area">
                            <!-- Todos los amigos -->
                            <div v-if="selectedFilter === 'all'" class="friends-grid">
                                <v-row>
                                    <v-col 
                                        v-for="friend in allFriends" 
                                        :key="friend.id"
                                        cols="12" sm="6" md="4" lg="3"
                                    >
                                        <friend-card :friend="friend" />
                                    </v-col>
                                </v-row>
                            </div>
                            
                            <!-- Solicitudes pendientes -->
                            <div v-else-if="selectedFilter === 'pending'">
                                <div v-if="pendingRequests.length > 0">
                                    <div 
                                        v-for="request in pendingRequests"
                                        :key="request.id"
                                        class="request-item pa-4"
                                    >
                                        <!-- Aquí va el contenido de cada solicitud -->
                                    </div>
                                </div>
                                <div v-else class="text-center py-8">
                                    <v-icon size="64" color="grey-lighten-2" class="mb-4">
                                        mdi-account-check
                                    </v-icon>
                                    <div class="text-h6">No hay solicitudes pendientes</div>
                                </div>
                            </div>
                            
                            <!-- Otros filtros -->
                            <div v-else class="text-center py-8">
                                <v-icon size="64" color="grey-lighten-2" class="mb-4">
                                    {{ getFilterIcon(selectedFilter) }}
                                </v-icon>
                                <div class="text-h6">{{ getFilterMessage(selectedFilter) }}</div>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
                
                <!-- Sección adicional (sugerencias, estadísticas, etc.) -->
                <v-row class="mt-2 mt-md-4">
                    <v-col cols="12" md="6">
                        <v-card class="ma-2" rounded="lg" height="100%">
                            <v-card-title>
                                <v-icon color="green" class="mr-2">mdi-account-plus</v-icon>
                                Sugerencias
                            </v-card-title>
                            <v-card-text>
                                <!-- Contenido sugerencias -->
                            </v-card-text>
                        </v-card>
                    </v-col>
                    
                    <v-col cols="12" md="6">
                        <v-card class="ma-2" rounded="lg" height="100%">
                            <v-card-title>
                                <v-icon color="blue" class="mr-2">mdi-chart-bar</v-icon>
                                Estadísticas
                            </v-card-title>
                            <v-card-text>
                                <!-- Contenido estadísticas -->
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Estado
const selectedFilter = ref('all')
const totalFriends = ref(156)

// Datos de ejemplo
const pendingRequests = ref([
  // tus datos aquí
])

const allFriends = ref([
  // tus datos aquí
])

// Métodos
const getFilterIcon = (filter: string) => {
  const icons: Record<string, string> = {
    'all': 'mdi-account-group',
    'pending': 'mdi-clock',
    'accepted': 'mdi-check',
    'rejected': 'mdi-close'
  }
  return icons[filter] || 'mdi-account'
}

const getFilterMessage = (filter: string) => {
  const messages: Record<string, string> = {
    'all': 'Todos tus amigos',
    'pending': 'Solicitudes pendientes',
    'accepted': 'Amigos aceptados',
    'rejected': 'Solicitudes rechazadas'
  }
  return messages[filter] || 'Filtro activo'
}
</script>

<style scoped>
.friends-container {
  min-height: calc(100vh - 56px); /* Resta la altura del header */
  background-color: transparent;
  padding-top: 2px;
}

/* Asegura que el contenido no sea demasiado ancho en pantallas grandes */
@media (min-width: 1900px) {
  .friends-container .v-col {
    max-width: 1600px;
    margin: 0 auto;
  }
}

/* Para mantener la card centrada pero con buen uso del espacio */
@media (min-width: 960px) {
  .friends-container .v-card {
    max-width: 100%;
    margin: 0 auto;
  }
}

.content-area {
  min-height: 300px;
}

.request-item {
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
}

.request-item:hover {
  background-color: #f8f9fa;
}

.request-item:last-child {
  border-bottom: none;
}

/* Grid de amigos responsivo */
.friends-grid {
  display: grid;
  gap: 16px;
}

/* Ajustes para pantallas muy grandes */
@media (min-width: 1920px) {
  .friends-container .v-col {
    max-width: 1800px;
  }
  
  .friends-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* Para pantallas medianas */
@media (max-width: 1264px) and (min-width: 960px) {
  .friends-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Para mobile */
@media (max-width: 599px) {
  .friends-container {
    padding-top: 0;
  }
  
  .friends-container .v-card {
    border-radius: 2 !important;
    margin: 0 !important;
  }
}
</style>