import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    deps: {
      inline: [/^(?!.*@mui\/material\/).*/]
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    exclude: [...configDefaults.exclude, 'e2e/*'],
  },
})
