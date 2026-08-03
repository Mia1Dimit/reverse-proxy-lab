import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base must match the Traefik route prefix so asset paths resolve correctly
  base: '/about-me/',
  server: { port: 3001 },
});
