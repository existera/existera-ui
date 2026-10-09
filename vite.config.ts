import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import path from "node:path";

const root = import.meta.dirname;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src/lib",
      insertTypesEntry: true,
      bundleTypes: true,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
    },
  },

  build: {
    target: "es2022",
    emptyOutDir: true,
    copyPublicDir: false,
    sourcemap: true,
    cssCodeSplit: true,
    cssMinify: "esbuild",

    lib: {
      entry: {
        index: path.resolve(root, "src/lib/index.ts"),
        style: path.resolve(root, "src/lib/style.css"),
      },
      formats: ["es"],
    },

    rolldownOptions: {
      external: [
        /^react(?:\/.*)?$/,
        /^react-dom(?:\/.*)?$/,
        /^framer-motion(?:\/.*)?$/,
        /^lucide-react(?:\/.*)?$/,
        /^@emotion\/is-prop-valid(?:\/.*)?$/,
      ],

      output: {
        preserveModules: true,
        preserveModulesRoot: "src/lib",
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",

        assetFileNames(assetInfo) {
          if (assetInfo.name?.endsWith(".css")) {
            return "style.css";
          }

          return "assets/[name][extname]";
        },
      },
    },
  },
});
