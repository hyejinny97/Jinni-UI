/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@/styles': path.join(__dirname, 'src/styles')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTest.ts']
  }
});
