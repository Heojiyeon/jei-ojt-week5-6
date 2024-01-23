import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import VitePluginWindicss from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginWindicss()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/main.tsx', // main.html에 대한 엔트리 포인트
        problem: 'src/problemSrc/ProblemMain.tsx', // another.html에 대한 엔트리 포인트
      },
    },
  },
});
