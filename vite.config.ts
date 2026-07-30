import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Shield',
      fileName: (format) => `shield.${format === 'iife' ? 'min' : format}.js`,
      formats: ['iife', 'es']
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: false
      }
    }
  }
});
