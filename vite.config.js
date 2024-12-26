import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './', // Use relative paths for production
  build: {
    outDir: 'dist', // Output directory
    chunkSizeWarningLimit: 1000, // Optional: Increase the chunk size warning limit
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // Main entry point
        virtualmap: path.resolve(__dirname, 'virtualmap.html'), // Secondary page
      },
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.json', '**/*.webp'], // Include static file types
  publicDir: 'public', // Specify a public directory for static files
});
