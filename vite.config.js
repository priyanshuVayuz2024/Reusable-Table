import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const isProdBuild = mode === "build-mf"; // our custom prod MF mode

  return {
    plugins: [react(), tailwindcss()],
    build: {
      lib: {
        entry: "./src/export.js",
        name: "reusableTable",
        fileName: () => `reusableTable-bundle.js`,
        formats: ["umd"],
      },
      rollupOptions: {
        external: isProdBuild
          ? ["react", "react-dom", "tailwindcss", "@mui/material"]
          : [],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            tailwindcss: "tailwindcss",
            "@mui/material": "MaterialUI",
          },
        },
      },
      cssCodeSplit: false,
      define: {
        "process.env": JSON.stringify({}),
      },
      outDir: "dist",
    },
    optimizeDeps: {
      exclude: isProdBuild
        ? ["react", "react-dom", "tailwindcss", "@mui/material"]
        : [],
    },
  };
});
