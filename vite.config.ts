import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
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
      deleteOriginFile: false,
    }),
    // Brotli compression for modern browsers
    compression({
      include: /\.(js|css|html|svg|json)$/,
      algorithm: 'brotliCompress' as any,
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Disable sourcemaps in production for smaller bundle size
    sourcemap: false,

    // Use terser for minification with optimized settings
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console.log statements in production
        drop_console: true,
        drop_debugger: true,
        // Additional compression options for mobile
        passes: 2,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: {
        safari10: true, // Fix Safari 10 issues
      },
      format: {
        comments: false, // Remove all comments
      },
    },

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
        
        manualChunks: {
          // Core React libraries - stable, cacheable chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // Radix UI components - separate chunk for UI primitives
          'radix-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip',
          ],

          // 3D libraries - used by react-bits components (lazy load)
          'three-vendor': [
            'three',
            '@react-three/fiber',
            '@react-three/drei',
            '@react-three/postprocessing',
            'postprocessing',
          ],

          // Animation libraries - used by react-bits components
          'animation-vendor': ['gsap', 'motion'],

          // React-Bits WebGL dependencies
          'react-bits-deps': ['ogl'],

          // Form libraries - ready for react-hook-form integration
          'form-vendor': ['zod'], // Will include react-hook-form, @hookform/resolvers when added

          // Utility libraries
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
        
        // Optimize chunk size
        compact: true,
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
