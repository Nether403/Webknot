// vite.config.ts
import path from "path";
import react from "file:///F:/Webknot/node_modules/@vitejs/plugin-react/dist/index.js";
import { defineConfig } from "file:///F:/Webknot/node_modules/vite/dist/node/index.js";
import { visualizer } from "file:///F:/Webknot/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { compression } from "file:///F:/Webknot/node_modules/vite-plugin-compression2/dist/index.mjs";
var __vite_injected_original_dirname = "F:\\Webknot";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "./dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true
    }),
    // Gzip compression for better mobile performance
    compression({
      include: /\.(js|css|html|svg|json)$/,
      threshold: 1024
      // Only compress files larger than 1KB
    }),
    // Brotli compression for modern browsers
    compression({
      include: /\.(js|css|html|svg|json)$/,
      algorithms: ["brotliCompress"],
      threshold: 1024
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
    // react-bits is a standalone subproject — never crawl it from the main bundle
    entries: ["src/**/*.tsx", "src/**/*.ts"]
  },
  build: {
    // Disable sourcemaps in production for smaller bundle size
    sourcemap: false,
    // Use esbuild for minification (faster)
    minify: "esbuild",
    // Target modern browsers for smaller bundle
    target: "es2020",
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        // Optimize chunk naming for better caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        // Ensure proper module format for Three.js
        format: "es",
        manualChunks: {
          // Core React libraries - stable, cacheable chunk
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Radix UI components - separate chunk for UI primitives
          "radix-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-aspect-ratio",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
            "@radix-ui/react-tooltip"
          ],
          // Animation libraries — used by react-bits components
          "animation-vendor": ["gsap", "motion"],
          // React-Bits WebGL dependencies
          "react-bits-deps": ["ogl"],
          // Form libraries - ready for react-hook-form integration
          "form-vendor": ["zod"],
          // Will include react-hook-form, @hookform/resolvers when added
          // Utility libraries
          utils: ["clsx", "tailwind-merge", "class-variance-authority"]
        },
        // Optimize chunk size
        compact: true
      }
    },
    // Reduce chunk size warning limit for mobile optimization
    chunkSizeWarningLimit: 500,
    // Optimize asset inlining
    assetsInlineLimit: 4096
    // Inline assets smaller than 4KB
  },
  // Optimize server for development
  server: {
    port: 5173,
    strictPort: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxXZWJrbm90XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxXZWJrbm90XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9XZWJrbm90L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcclxuaW1wb3J0IHsgY29tcHJlc3Npb24gfSBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbjInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgdmlzdWFsaXplcih7XHJcbiAgICAgIGZpbGVuYW1lOiAnLi9kaXN0L3N0YXRzLmh0bWwnLFxyXG4gICAgICBvcGVuOiBmYWxzZSxcclxuICAgICAgZ3ppcFNpemU6IHRydWUsXHJcbiAgICAgIGJyb3RsaVNpemU6IHRydWUsXHJcbiAgICB9KSxcclxuICAgIC8vIEd6aXAgY29tcHJlc3Npb24gZm9yIGJldHRlciBtb2JpbGUgcGVyZm9ybWFuY2VcclxuICAgIGNvbXByZXNzaW9uKHtcclxuICAgICAgaW5jbHVkZTogL1xcLihqc3xjc3N8aHRtbHxzdmd8anNvbikkLyxcclxuICAgICAgdGhyZXNob2xkOiAxMDI0LCAvLyBPbmx5IGNvbXByZXNzIGZpbGVzIGxhcmdlciB0aGFuIDFLQlxyXG4gICAgfSksXHJcbiAgICAvLyBCcm90bGkgY29tcHJlc3Npb24gZm9yIG1vZGVybiBicm93c2Vyc1xyXG4gICAgY29tcHJlc3Npb24oe1xyXG4gICAgICBpbmNsdWRlOiAvXFwuKGpzfGNzc3xodG1sfHN2Z3xqc29uKSQvLFxyXG4gICAgICBhbGdvcml0aG1zOiBbJ2Jyb3RsaUNvbXByZXNzJ10sXHJcbiAgICAgIHRocmVzaG9sZDogMTAyNCxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXHJcbiAgICAvLyByZWFjdC1iaXRzIGlzIGEgc3RhbmRhbG9uZSBzdWJwcm9qZWN0IFx1MjAxNCBuZXZlciBjcmF3bCBpdCBmcm9tIHRoZSBtYWluIGJ1bmRsZVxyXG4gICAgZW50cmllczogWydzcmMvKiovKi50c3gnLCAnc3JjLyoqLyoudHMnXSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICAvLyBEaXNhYmxlIHNvdXJjZW1hcHMgaW4gcHJvZHVjdGlvbiBmb3Igc21hbGxlciBidW5kbGUgc2l6ZVxyXG4gICAgc291cmNlbWFwOiBmYWxzZSxcclxuXHJcbiAgICAvLyBVc2UgZXNidWlsZCBmb3IgbWluaWZpY2F0aW9uIChmYXN0ZXIpXHJcbiAgICBtaW5pZnk6ICdlc2J1aWxkJyxcclxuXHJcbiAgICAvLyBUYXJnZXQgbW9kZXJuIGJyb3dzZXJzIGZvciBzbWFsbGVyIGJ1bmRsZVxyXG4gICAgdGFyZ2V0OiAnZXMyMDIwJyxcclxuXHJcbiAgICAvLyBPcHRpbWl6ZSBDU1NcclxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcclxuICAgIGNzc01pbmlmeTogdHJ1ZSxcclxuXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIC8vIE9wdGltaXplIGNodW5rIG5hbWluZyBmb3IgYmV0dGVyIGNhY2hpbmdcclxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdJyxcclxuICAgICAgICBcclxuICAgICAgICAvLyBFbnN1cmUgcHJvcGVyIG1vZHVsZSBmb3JtYXQgZm9yIFRocmVlLmpzXHJcbiAgICAgICAgZm9ybWF0OiAnZXMnLFxyXG4gICAgICAgIFxyXG4gICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgLy8gQ29yZSBSZWFjdCBsaWJyYXJpZXMgLSBzdGFibGUsIGNhY2hlYWJsZSBjaHVua1xyXG4gICAgICAgICAgJ3JlYWN0LXZlbmRvcic6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcclxuXHJcbiAgICAgICAgICAvLyBSYWRpeCBVSSBjb21wb25lbnRzIC0gc2VwYXJhdGUgY2h1bmsgZm9yIFVJIHByaW1pdGl2ZXNcclxuICAgICAgICAgICdyYWRpeC11aSc6IFtcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1hY2NvcmRpb24nLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWFsZXJ0LWRpYWxvZycsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtYXNwZWN0LXJhdGlvJyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1hdmF0YXInLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWNoZWNrYm94JyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1jb2xsYXBzaWJsZScsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtY29udGV4dC1tZW51JyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kaWFsb2cnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnUnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWhvdmVyLWNhcmQnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWxhYmVsJyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1tZW51YmFyJyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1uYXZpZ2F0aW9uLW1lbnUnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXBvcG92ZXInLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXByb2dyZXNzJyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1yYWRpby1ncm91cCcsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2Nyb2xsLWFyZWEnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXNlbGVjdCcsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2VwYXJhdG9yJyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1zbGlkZXInLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXNsb3QnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXN3aXRjaCcsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdGFicycsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9hc3QnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXRvZ2dsZScsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9nZ2xlLWdyb3VwJyxcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC10b29sdGlwJyxcclxuICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgLy8gQW5pbWF0aW9uIGxpYnJhcmllcyBcdTIwMTQgdXNlZCBieSByZWFjdC1iaXRzIGNvbXBvbmVudHNcclxuICAgICAgICAgICdhbmltYXRpb24tdmVuZG9yJzogWydnc2FwJywgJ21vdGlvbiddLFxyXG5cclxuICAgICAgICAgIC8vIFJlYWN0LUJpdHMgV2ViR0wgZGVwZW5kZW5jaWVzXHJcbiAgICAgICAgICAncmVhY3QtYml0cy1kZXBzJzogWydvZ2wnXSxcclxuXHJcbiAgICAgICAgICAvLyBGb3JtIGxpYnJhcmllcyAtIHJlYWR5IGZvciByZWFjdC1ob29rLWZvcm0gaW50ZWdyYXRpb25cclxuICAgICAgICAgICdmb3JtLXZlbmRvcic6IFsnem9kJ10sIC8vIFdpbGwgaW5jbHVkZSByZWFjdC1ob29rLWZvcm0sIEBob29rZm9ybS9yZXNvbHZlcnMgd2hlbiBhZGRlZFxyXG5cclxuICAgICAgICAgIC8vIFV0aWxpdHkgbGlicmFyaWVzXHJcbiAgICAgICAgICB1dGlsczogWydjbHN4JywgJ3RhaWx3aW5kLW1lcmdlJywgJ2NsYXNzLXZhcmlhbmNlLWF1dGhvcml0eSddLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIE9wdGltaXplIGNodW5rIHNpemVcclxuICAgICAgICBjb21wYWN0OiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBSZWR1Y2UgY2h1bmsgc2l6ZSB3YXJuaW5nIGxpbWl0IGZvciBtb2JpbGUgb3B0aW1pemF0aW9uXHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDUwMCxcclxuXHJcbiAgICAvLyBPcHRpbWl6ZSBhc3NldCBpbmxpbmluZ1xyXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDQwOTYsIC8vIElubGluZSBhc3NldHMgc21hbGxlciB0aGFuIDRLQlxyXG4gIH0sXHJcblxyXG4gIC8vIE9wdGltaXplIHNlcnZlciBmb3IgZGV2ZWxvcG1lbnRcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDUxNzMsXHJcbiAgICBzdHJpY3RQb3J0OiBmYWxzZSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvTixPQUFPLFVBQVU7QUFDck8sT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsbUJBQW1CO0FBSjVCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQTtBQUFBLElBRUQsWUFBWTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBO0FBQUEsSUFDYixDQUFDO0FBQUE7QUFBQSxJQUVELFlBQVk7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULFlBQVksQ0FBQyxnQkFBZ0I7QUFBQSxNQUM3QixXQUFXO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGNBQWM7QUFBQTtBQUFBLElBRXhCLFNBQVMsQ0FBQyxnQkFBZ0IsYUFBYTtBQUFBLEVBQ3pDO0FBQUEsRUFDQSxPQUFPO0FBQUE7QUFBQSxJQUVMLFdBQVc7QUFBQTtBQUFBLElBR1gsUUFBUTtBQUFBO0FBQUEsSUFHUixRQUFRO0FBQUE7QUFBQSxJQUdSLGNBQWM7QUFBQSxJQUNkLFdBQVc7QUFBQSxJQUVYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQTtBQUFBLFFBRU4sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUE7QUFBQSxRQUdoQixRQUFRO0FBQUEsUUFFUixjQUFjO0FBQUE7QUFBQSxVQUVaLGdCQUFnQixDQUFDLFNBQVMsYUFBYSxrQkFBa0I7QUFBQTtBQUFBLFVBR3pELFlBQVk7QUFBQSxZQUNWO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUE7QUFBQSxVQUdBLG9CQUFvQixDQUFDLFFBQVEsUUFBUTtBQUFBO0FBQUEsVUFHckMsbUJBQW1CLENBQUMsS0FBSztBQUFBO0FBQUEsVUFHekIsZUFBZSxDQUFDLEtBQUs7QUFBQTtBQUFBO0FBQUEsVUFHckIsT0FBTyxDQUFDLFFBQVEsa0JBQWtCLDBCQUEwQjtBQUFBLFFBQzlEO0FBQUE7QUFBQSxRQUdBLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFHQSx1QkFBdUI7QUFBQTtBQUFBLElBR3ZCLG1CQUFtQjtBQUFBO0FBQUEsRUFDckI7QUFBQTtBQUFBLEVBR0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2Q7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
