import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/', // Change to '/repo-name/' if deploying to username.github.io/repo-name/
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: true, // Shows compilation errors as overlay
    },
    watch: {
      usePolling: true, // Ensures file changes are detected on all systems
    },
  },
  plugins: [
    react({
      // Fast Refresh for instant updates
      fastRefresh: true,
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: mode === "development", // Better debugging in dev mode
  },
}));
