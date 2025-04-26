import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  test: {
    globals: true,             // Pour utiliser des globals comme "describe", "it", "expect" sans import
    environment: 'jsdom',      // Simule le DOM pour les tests React
    setupFiles: './setupTests.js', // Pour les setups globaux comme jest-dom
    exclude: [...configDefaults.exclude, 'e2e/*'], // Exclure certains dossiers si besoin
  },
})
