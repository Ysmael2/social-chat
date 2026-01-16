
  <!-- layout principal -->
 <template>
<br><br><br>
<div class="home-container">
    <!-- Contenedor principal -->
    <v-container class="pa-0">
      <v-row no-gutters>

        <!-- Chat Global -->
        <v-col cols="12" md="6">
         
          <!-- Chat en tiempo real -->
          <v-card class="ma-2" rounded="lg">
            <v-card-title class="d-flex align-center">
              <v-icon color="primary" class="mr-2">mdi-chat</v-icon>
              <span>Chat Global</span>
              <v-chip size="small" color="primary" class="ml-2">
                {{ onlineUsers }} en línea
              </v-chip>
            </v-card-title>
            
            <v-divider></v-divider>
            
            <!-- Mensajes -->
            <div class="chat-messages pa-4" style="height: 400px; overflow-y: auto;">
              <div v-if="messages.length === 0" class="text-center py-8">
                <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-chat-outline</v-icon>
                <div class="text-subtitle-1 text-grey">¡Sé el primero en enviar un mensaje!</div>
              </div>
              
              <div
                v-for="message in messages"
                :key="message.id"
                class="message-item mb-3"
              >
                <div class="d-flex align-start">
                  <v-avatar size="36" color="blue" class="mr-3">
                    <span class="text-white">{{ message.userInitials }}</span>
                  </v-avatar>
                  
                  <div class="message-content">
                    <div class="d-flex align-center mb-1">
                      <span class="font-weight-bold mr-2">{{ message.userName }}</span>
                      <span class="text-caption text-grey">{{ formatTime(message.time) }}</span>
                    </div>
                    <div class="message-bubble pa-3">
                      {{ message.text }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Input para mensaje -->
            <v-divider></v-divider>
            <div class="pa-3">
              <div class="d-flex align-center">
                <v-avatar size="36" color="primary" class="mr-2">
                  <span class="text-white">{{ getUserInitials }}</span>
                </v-avatar>
                <v-text-field
                
                  v-model="newMessage"
                  placeholder="Escribe un mensaje..."
                  variant="outlined"
                  density="compact"
                  hide-details
                  rounded
                  class="message-input"
                  @keyup.enter="sendMessage"
                ></v-text-field>
                <v-btn 
                  icon 
                  color="primary" 
                  class="ml-2"
                  :disabled="!newMessage.trim()"
                  @click="sendMessage"
                >
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Datos
const newMessage = ref('')
const onlineUsers = ref(25)
const messages = ref([
  { id: 1, userName: 'Juan Pérez', userInitials: 'JP', text: '¡Hola a todos!', time: '14:30' },
  { id: 2, userName: 'María García', userInitials: 'MG', text: '¿Cómo están?', time: '14:45' },
  { id: 3, userName: authStore.userName || 'Tú', userInitials: computed(() => getUserInitials.value), text: '¡Bienvenidos al chat global!', time: '15:00' }
])
// Computed
const getUserInitials = computed(() => {
  if (authStore.userName) {
    return authStore.userName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }
  return 'US'
})

// Métodos
const sendMessage = () => {
  if (!newMessage.value.trim()) return

  const message = {
    id: Date.now(),
    userName: authStore.userName || 'Tú',
    userInitials: getUserInitials.value,
    text: newMessage.value,
    time: getCurrentTime()
  }

  messages.value.push(message)
  newMessage.value = ''
}

const formatTime = (time: string) => {
  return time
}

const getCurrentTime = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
</script>

<style scoped>
.home-container {
  min-height: calc(100vh - 64px);
  background-color: transparent;
}

.home-header {
  background-color: rgb(110, 0, 0);
  border-bottom: 1px solid #e5e5e5;
}

.chat-messages {
  transition: height 0.3s ease;
}

.message-item {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-bubble {
  background-color: #e5e5e5;
  border-radius: 18px;
  max-width: 80%;
  word-wrap: break-word;
}

/* Scrollbar */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
.message-input{
  background-color: #e5e5e5;
  border-radius: 30px;
  }
</style>