// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Importa los iconos

// Opcional: si quieres usar SVG icons
// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export default createVuetify({
  components,
  directives,
  // Si usas SVG icons:
  // icons: {
  //   defaultSet: 'mdi',
  //   aliases,
  //   sets: {
  //     mdi,
  //   },
  // },
})