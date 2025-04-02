import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"], // Créez ce fichier si nécessaire
    coverage: {
      reporter: ["text", "json", "html"], // Génération des rapports de couverture
    },
  },
});
