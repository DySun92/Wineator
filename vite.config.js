import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: true },
  build: {
    outDir: 'dist',
    sourcemap: false,          // evita gerar mapas (build mais estável)
    emptyOutDir: true
  },
  logLevel: 'info'
});
