import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://kentayoung.dev",
  build: { inlineStylesheets: "always" },
  vite: { plugins: [tailwindcss()] },
});
