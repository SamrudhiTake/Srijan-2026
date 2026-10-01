import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const rawTarget = env.VITE_API_URL || env.VITE_BACKEND_URL || 'http://localhost:9000';
  // Strip trailing /api if present for proxy target
  const backendUrl = rawTarget.trim().replace(/\/api\/?$/, '');

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
