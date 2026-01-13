import { env } from 'process'

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue-router'

declare module 'ably/app' {
  export function initializeAbly(): void}