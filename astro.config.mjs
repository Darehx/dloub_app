// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Configuración del servidor de desarrollo de Vite (usado por Astro)
      proxy: {
        "/api": {
          target: "http://localhost:8000", // Puerto de tu backend Django (ajústalo si usas otro)
          changeOrigin: true,
          rewrite: (path) => path, // Mantiene "/api" en la URL enviada al backend
        },
      },
    },
  },
  integrations: [
    react({
      include: ["**/react/*"], // Solo aplica React a componentes en esta ruta
    }),
  ],
  server: {
    port: 3000, // Puerto del servidor de desarrollo de Astro (opcional, ajusta si necesitas)
  },
});