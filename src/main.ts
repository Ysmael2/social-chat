import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { initializeApp } from "firebase/app";
import {useAbly} from './services/ably'

//inicializando frirebase
const firebaseConfig = {
  apiKey: "AIzaSyCtRfNVafsh2GtemFcIpQ-KX9sYHLDW38A",
  authDomain: "curso-vue-f9f41.firebaseapp.com",
  projectId: "curso-vue-f9f41",
  storageBucket: "curso-vue-f9f41.firebasestorage.app",
  messagingSenderId: "148206399730",
  appId: "1:148206399730:web:8cce8a710240e7195c606b",
  measurementId: "G-V7QSC44K91"
};


initializeApp(firebaseConfig);


//iniciealizando ably

const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App)
app.use(useAbly)
app.use(pinia).use(vuetify).use(router).mount('#app')
