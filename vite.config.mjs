import path from 'path';
import { defineConfig } from 'vite';
import vitePugPlugin from 'vite-plugin-pug-transformer';


export default defineConfig({
  plugins: [
    vitePugPlugin()
  ],
  build: {
    target: 'esnext', // browsers can handle the latest ES features
    rollupOptions: {
      input: ['index.html'],
    },
    chunkSizeWarningLimit: 700
  },
  resolve: {
    alias: {
      'three': path.resolve(__dirname, './node_modules/three')
    }
  },
  server: {
    host: true, // allows external access
    fs: {
      allow: ['..']
    }
  },
  preview: {
    host: true,
    fs: {
      allow: ['..']
    }
  }
})
