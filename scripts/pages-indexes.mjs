/**
 * GitHub Pages has no extension rewrite. Copy each route html file to
 * <route>/index.html so /ueber-mich/ and /arbeiten/promiflash/ resolve.
 * index.html at the site root stays put. Plain nginx builds do not run this.
 */
import { copyFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join } from "node:path";

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, acc);
    else if (name.endsWith(".html") && name !== "index.html") acc.push(path);
  }
  return acc;
}

const dist = process.argv[2] || "dist";
const files = walk(dist).sort((a, b) => b.length - a.length);

for (const file of files) {
  const destDir = join(dirname(file), basename(file, ".html"));
  mkdirSync(destDir, { recursive: true });
  copyFileSync(file, join(destDir, "index.html"));
}

console.log(`wrote ${files.length} directory indexes under ${dist}`);
