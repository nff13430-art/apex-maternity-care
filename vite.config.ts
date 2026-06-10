// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const githubPagesBase = process.env.GITHUB_PAGES_BASE || "/";

export default defineConfig({
  vite: {
    base: isGitHubPagesBuild ? githubPagesBase : "/",
  },
  nitro: isGitHubPagesBuild ? false : undefined,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isGitHubPagesBuild
      ? {
          pages: [
            { path: "/", prerender: { outputPath: "/index", autoSubfolderIndex: false } },
            { path: "/admin", prerender: { outputPath: "/admin/index", autoSubfolderIndex: false } },
          ],
          prerender: {
            enabled: true,
            crawlLinks: false,
            failOnError: false,
            autoStaticPathsDiscovery: false,
          },
        }
      : {}),
  },
});
