import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Permet d'utiliser des fonctions comme `describe`, `it`, etc. sans import
    coverage: {
      reporter: ["text", "json", "html"], // Génération des rapports de couverture
    },
    environment: "jsdom", // Utilisation de Node.js
  },
});
