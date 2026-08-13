import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  root: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3001,
    open: false,
  },
});

