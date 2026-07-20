import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  preview: {
    host: true,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4173,
    allowedHosts: ['wisewastes.onrender.com'],
  },
})
