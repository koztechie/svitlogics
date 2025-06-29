import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // The core React plugin for Vite.
    // It handles JSX transformation, Fast Refresh, and other React-specific optimizations.
    react(),
  ],
  
  build: {
    // Setting a specific target ensures better browser compatibility than 'esnext'.
    // 'es2020' is a safe target that is supported by all modern browsers and
    // still allows for modern syntax features like optional chaining.
    target: 'es2020',
  },

  // The 'optimizeDeps' section is usually not needed unless you are facing
  // specific issues with a particular dependency during development.
  // The 'lucide-react' exclusion and esbuildOptions can be removed for simplification.
  // Vite is generally smart enough to handle these dependencies correctly by default.
  // If you re-introduce it, ensure there's a specific reason.
  /*
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  },
  */
});