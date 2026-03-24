import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Подкаталог GitHub Pages: vitas810.github.io/toeat/
  base: command === 'build' ? '/toeat/' : '/',
  plugins: [vue()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
