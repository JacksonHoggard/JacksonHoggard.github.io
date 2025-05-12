import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  include: ['src/**/*.js', 'src/**/*.jsx'],
  exclude: ['node_modules', 'dist'],
  plugins: [react()],
})
