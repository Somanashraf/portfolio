import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // allows all hosts
    port: 5173,  // your dev server port
    strictPort: true,
    allowedHosts: [
      'overcourteous-leora-overdeliciously.ngrok-free.dev'
    ]
  }
})