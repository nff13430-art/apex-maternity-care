import { cp, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const distDir = "dist";
const clientDir = join(distDir, "client");

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

if (await exists(clientDir)) {
  const entries = await readdir(clientDir);

  for (const entry of entries) {
    await cp(join(clientDir, entry), join(distDir, entry), { recursive: true, force: true });
  }

  await rm(clientDir, { recursive: true, force: true });
  await rm(join(distDir, "server"), { recursive: true, force: true });
}

if (await exists(join(distDir, "index.html"))) {
  await cp(join(distDir, "index.html"), join(distDir, "404.html"), { force: true });
}

await mkdir(distDir, { recursive: true });
await writeFile(join(distDir, ".nojekyll"), "");