import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const resolveFromRoot = (relativePath: string) =>
  decodeURIComponent(new URL(relativePath, import.meta.url).pathname).replace(
    /^\/([A-Za-z]:\/)/,
    "$1",
  );

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/portfoliov2/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolveFromRoot("./src"),
      "@components": resolveFromRoot("./src/components"),
      "@pages": resolveFromRoot("./src/pages"),
      "@hooks": resolveFromRoot("./src/hooks"),
      "@lib": resolveFromRoot("./src/lib"),
      "@store": resolveFromRoot("./src/store"),
      "@styles": resolveFromRoot("./src/styles"),
      "@types": resolveFromRoot("./src/types"),
      "@utils": resolveFromRoot("./src/utils"),
      "@assets": resolveFromRoot("./src/assets"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
}));
