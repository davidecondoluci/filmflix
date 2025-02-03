import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Assicurati che il build finisca qui
  },
  server: {
    historyApiFallback: true, // Serve il file index.html per React Router
  },
});
