import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/rentflow': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
