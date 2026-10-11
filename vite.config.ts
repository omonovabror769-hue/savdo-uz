import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — sayt GitHub Pages yoki istalgan papkada ishlashi uchun
export default defineConfig({
  plugins: [react()],
  base: './',
});
