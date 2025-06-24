import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 10000,
    host: true,
  },
  preview: {
    port: 10000,
    host: true,
  },
});
