import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // We use process.cwd() safely assuming Node environment during build
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: './', // Ensures assets load correctly on Vercel/GitHub Pages
    define: {
      // This fixes the "process is not defined" error by replacing it with the actual value during build
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Fallback to prevent crash if other process.env vars are accessed
      'process.env': {} 
    },
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000
    }
  };
});
