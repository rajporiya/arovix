import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Shared dependencies are installed in ../../node_modules as well as here,
    // which installs a second copy of React. Force every import (including the
    // ones from lucide-react) to use this app's copy.
    dedupe: ['react', 'react-dom'],
  },
})
