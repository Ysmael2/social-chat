// import { App, inject } from 'vue';
// import { Realtime } from 'ably';

// const ablyConfig = {
//   key: 'b5FZXg.XdRcAA:0U1uSBMcyh4NBeT9jtqaIFzQztS8FunoTq9at8zmF3I', // Reemplaza con tu API key
//   clientId: 'vue-client-' + Math.random().toString(36).substr(2, 9),
//   // Opciones adicionales
//   echoMessages: false,
//   autoConnect: true,
// };

// export const ably = new Realtime(ablyConfig);

// export const ablyPlugin = {
//   install(app: App) {
//     app.config.globalProperties.$ably = ably;
//     app.provide('ably', ably);
//   }
// };

// export function useAbly() {
//   return inject('ably') as Realtime | undefined;
// }