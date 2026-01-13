/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}
interface ImportMetaEnv {
  readonly VITE_ABLY_API_KEY: string
  // ... otras variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}