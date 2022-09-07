import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
