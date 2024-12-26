import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Use relative paths for production
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      input: {
        main: './index.html', // Main entry point
        virtualmap: './virtualmap.html', // Secondary page
      },
    },
    assetsInclude: ["**/*.glb"],
  },
});