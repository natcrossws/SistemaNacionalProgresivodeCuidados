import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// @ts-ignore - __dirname is not defined in ES module scope, but path.resolve can use process.cwd() or import.meta.url
const __dirname = path.resolve();

const devHttps = {
  key: fs.readFileSync(path.resolve(__dirname, '../backend/certs/api.devlocal.net.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../backend/certs/api.devlocal.net.crt')),
};

const backendProxyTarget = process.env.VITE_BACKEND_PROXY_TARGET || 'http://127.0.0.1:3000';

const localBackendProxy = {
  target: backendProxyTarget,
  changeOrigin: true,
  secure: false,
};

const devProxy = {
  '/api': localBackendProxy,
  '/socket.io': { ...localBackendProxy, ws: true },
};

export default defineConfig({
  envDir: '../',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    https: devHttps,
    proxy: devProxy,
  },
  preview: {
    https: devHttps,
    proxy: devProxy,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
