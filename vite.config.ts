import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      // '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
      // '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url)),
      // '@interfaces': fileURLToPath(new URL('./src/interfaces', import.meta.url)),
      // '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
      // '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      // '@views': fileURLToPath(new URL('./src/views', import.meta.url))
    }
  }
})
