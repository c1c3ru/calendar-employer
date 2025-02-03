import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  optimizeDeps: {
    exclude: ['react-native'],
  },
  
  plugins: [react()],
  esbuild: {
    logOverride: { 'this-undefined': 'silent' }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    
  },
})