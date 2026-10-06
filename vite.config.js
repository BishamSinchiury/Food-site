import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // @ → src/  (used everywhere as @/contexts/..., @/pages/..., etc.)
      "@": `${import.meta.dirname}/src`,
    },
  },
});