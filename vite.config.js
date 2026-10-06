import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: '0.0.0.0',

    proxy: {
      '/api': {
        target: 'http://host.docker.internal:3000',
        changeOrigin: true,
      },
    },
  },
})