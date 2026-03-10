import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // frontend dev port
  },
  build: {
    outDir: "dist", // Vercel expects "dist"
  },
  base: "./", // ensures proper routing of assets
});