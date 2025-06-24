import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 10000,
    proxy: {
      '/api': {
        // Todas as rotas /api vão para o JSON Server
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    host: true,
  },
  preview: {
    port: 10000,
    host: true,
    allowedHosts: ['ignite-dt-money.onrender.com', 'localhost'],
  },
});
