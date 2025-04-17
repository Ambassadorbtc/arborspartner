import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

const conditionalPlugins: [string, Record<string, any>][] = [];

// @ts-ignore
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/" : "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
    exclude: ["framer-motion"],
  },
  plugins: [
    react({
      plugins: conditionalPlugins,
    }),
    tempo(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: process.env.NODE_ENV !== "production",
    minify: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "@supabase/supabase-js",
          ],
          "framer-motion": ["framer-motion"],
          ui: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
          ],
          charts: ["recharts"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          utils: [
            "date-fns",
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
          ],
        },
        // Add cache busting for assets
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
    // Optimize dependencies during build
    commonjsOptions: {
      include: [/node_modules/],
      extensions: [".js", ".cjs"],
      strictRequires: true,
      transformMixedEsModules: true,
    },
  },
});
