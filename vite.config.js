import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss()],
  publicDir: "../public",
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        home: resolve(__dirname, "src/index.html"),
        meals: resolve(__dirname, "src/meals/index.html"),
        mealDetails: resolve(__dirname, "src/meals/meal-details.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
      },
    },
  },
});
