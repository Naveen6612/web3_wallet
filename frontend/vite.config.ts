import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path"; // ✅ Correct way for ESM-style Vite config
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
   base: "/",
  plugins: [react(), tailwindcss(), ],
  resolve: {
    alias: {
       process: path.resolve(__dirname, "node_modules/process/browser.js"), // ✅ Correct absolute path
      buffer: path.resolve(__dirname, "node_modules/buffer/"),              // ✅ Correct absolute path
      stream: path.resolve(__dirname, "node_modules/stream-browserify"),   // ✅ Correct absolute path
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  define: {
    global: "globalThis", // 👈 critical
  },
  optimizeDeps: {
    include: ["buffer", "process", "stream"],
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill],
    },
  },
});
