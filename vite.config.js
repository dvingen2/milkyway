import { defineConfig } from "vite";
import { vitePort } from "./scripts/ports.mjs";

export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      build: {
        lib: {
          entry: "./src/index.js",
          name: "Milkyway",
          formats: ["es"],
          fileName: "milkyway",
        },
        rollupOptions: {
          output: {
            assetFileNames: "milkyway[extname]",
          },
        },
        cssCodeSplit: false,
        outDir: "dist",
      },
    };
  }

  return {
    server: {
      open: false,
      port: vitePort,
      strictPort: true,
    },
  };
});
