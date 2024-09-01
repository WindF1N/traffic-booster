import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '../',
  server: {
    host: '0.0.0.0',
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        })
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        inject({
          Buffer: ['Buffer', 'Buffer'],
        }),
      ],
    },
  },
})