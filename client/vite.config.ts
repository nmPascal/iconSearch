import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: true },
  build: { target: "esnext" },
  plugins: [react()],
});
