import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const appRootDir = fileURLToPath(new URL('.', import.meta.url))

// Копия index → 404.html: GitHub Pages отдаёт её при несуществующем пути (обновление SPA на /toeat/dishes и т.д.)
function githubPagesSpaFallbackPlugin() {
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build' as const,
    closeBundle() {
      const distDir = resolve(appRootDir, 'dist')
      copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'))
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Подкаталог GitHub Pages: vitas810.github.io/toeat/
  base: command === 'build' ? '/toeat/' : '/',
  plugins: [vue(), ...(command === 'build' ? [githubPagesSpaFallbackPlugin()] : [])],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
