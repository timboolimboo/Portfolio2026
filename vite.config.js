import { defineConfig } from "vite";
import { renderSite, siteBase } from "./scripts/render.mjs";

function rewriteCleanUrl(req) {
  const raw = req.url || "/";
  const queryIndex = raw.indexOf("?");
  const path = queryIndex === -1 ? raw : raw.slice(0, queryIndex);
  const query = queryIndex === -1 ? "" : raw.slice(queryIndex);
  if (
    path.length > 1 &&
    !path.includes(".") &&
    !path.startsWith("/@") &&
    !path.startsWith("/src/") &&
    !path.startsWith("/node_modules/") &&
    !path.startsWith("/images/")
  ) {
    const trimmed = path.endsWith("/") ? path.slice(0, -1) : path;
    req.url = `${trimmed}.html${query}`;
  }
}

const pages = renderSite();

export default defineConfig({
  base: siteBase(),
  plugins: [
    {
      name: "clean-urls",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          rewriteCleanUrl(req);
          next();
        });
        server.watcher.add("src/data/site.js");
        server.watcher.on("change", (file) => {
          if (file.endsWith("site.js")) {
            renderSite();
            server.ws.send({ type: "full-reload" });
          }
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          rewriteCleanUrl(req);
          next();
        });
      },
    },
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: pages,
    },
  },
});
