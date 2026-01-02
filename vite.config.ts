
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This allows the use of process.env.API_KEY in the browser
    // It will look for VITE_API_KEY in your .env or the system's API_KEY
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY || process.env.API_KEY || "")
  },
  server: {
    port: 5176,
    strictPort: true,
  },
});
