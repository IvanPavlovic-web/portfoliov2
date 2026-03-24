import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const resolveFromRoot = (relativePath: string) =>
  decodeURIComponent(new URL(relativePath, import.meta.url).pathname).replace(
    /^\/([A-Za-z]:\/)/,
    "$1",
  );

const normalizeBase = (value: string | undefined, fallback: string) => {
  const base = value?.trim() || fallback;

  if (base === "/") {
    return "/";
  }

  return `/${base.replace(/^\/+|\/+$/g, "")}/`;
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolveFromRoot("./"), "");
  const base = normalizeBase(env.VITE_SITE_BASE, mode === "production" ? "/portfoliov2/" : "/");

  return {
    base,
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
  };
});
