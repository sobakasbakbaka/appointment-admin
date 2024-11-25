import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react()],
    base: "/",
    define: isProduction
      ? {
          "import.meta.env.VITE_API_URL": JSON.stringify(
            process.env.VITE_API_URL
          ),
        }
      : {},
    build: {
      outDir: "dist",
    },
  };
});
