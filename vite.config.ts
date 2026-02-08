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
  'process.env': {
    ...env,
    VITE_API_KEY: env.VITE_API_KEY
  }
    }
    },
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000
    }
  };
});
