import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    // Gzip compression for better mobile performance
    compression({
      include: /\.(js|css|html|svg|json)$/,
      threshold: 1024, // Only compress files larger than 1KB
    }),
    // Brotli compression for modern browsers
    compression({
      include: /\.(js|css|html|svg|json)$/,
      algorithms: ['brotliCompress'],
      threshold: 1024,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    // react-bits is a standalone subproject — never crawl it from the main bundle
    entries: ['src/**/*.tsx', 'src/**/*.ts'],
  },
  build: {
    // Disable sourcemaps in production for smaller bundle size
    sourcemap: false,

    // Use esbuild for minification (faster)
    minify: 'esbuild',

    // Target modern browsers for smaller bundle
    target: 'es2020',

    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,

    rollupOptions: {
      output: {
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',

        // Ensure proper module format for Three.js
        format: 'es',

        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            if (id.includes('gsap') || id.includes('motion')) {
              return 'animation-vendor';
            }
            if (id.includes('ogl')) {
              return 'react-bits-deps';
            }
            if (id.includes('zod')) {
              return 'form-vendor';
            }
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
              return 'utils';
            }
          }
        }
      },
    },

    // Reduce chunk size warning limit for mobile optimization
    chunkSizeWarningLimit: 500,

    // Optimize asset inlining
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB
  },

  // Optimize server for development
  server: {
    port: 5173,
    strictPort: false,
  },
});
