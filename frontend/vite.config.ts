import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path"; // ✅ Correct way for ESM-style Vite config
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      buffer: "buffer", // 🔧 required for Buffer
      process: "process/browser",
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  define: {
    global: "globalThis", // 👈 critical
  },
  optimizeDeps: {
    include: ["buffer", "process"],
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill],
    },
  },
});
