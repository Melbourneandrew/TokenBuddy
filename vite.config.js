import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import polyfillNode from 'rollup-plugin-polyfill-node'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), polyfillNode()],
  server: {
    strictPort: true,
  },
  define: {
    global: {},
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
      supported: { bigint: true },
    },
  },
  build: {
    target: ["es2020"],
  },
});
