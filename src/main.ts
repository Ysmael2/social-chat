import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { initializeApp } from "firebase/app";
 
 import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const firebaseConfig = {
  apiKey: "AIzaSyApCQuxo8HaozucgV5hQMkqQAqzbR4b5Js",
  authDomain: "chat-social-42a00.firebaseapp.com",
  projectId: "chat-social-42a00",
  storageBucket: "chat-social-42a00.firebasestorage.app",
  messagingSenderId: "556853880010",
  appId: "1:556853880010:web:a4f2f1085c104351944033",
  measurementId: "G-06E9EQJDZH"
};
initializeApp(firebaseConfig);

const pinia = createPinia()
const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})

app.use(pinia).use(vuetify).use(router).mount('#app')
