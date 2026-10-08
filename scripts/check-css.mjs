import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

// Check the published artifact, so a successful JS build cannot hide missing CSS.
const css = await readFile(new URL("../dist/style.css", import.meta.url), "utf8");
assert.doesNotMatch(css, /@(theme|source|custom-variant|tailwind|apply)\b/, "CSS must be fully compiled");
assert.doesNotMatch(css, /@import\b/, "CSS must work without a CSS processor or remote imports");

for (const selector of [
  ".inline-flex", ".h-md", ".bg-primary", ".text-foreground",
  ".rounded-full", ".border-border", ".ex-input-number", ".ex-textarea-scroll",
  ".hover\\:opacity-90", ".dark\\:bg-primary\\/30",
]) {
  assert.ok(css.includes(selector), `Missing component selector: ${selector}`);
}
for (const token of ["--height-md:30px", "--color-primary:#3478f6", "--color-primary:#5a96ff"]) {
  assert.ok(css.includes(token), `Missing or changed design token: ${token}`);
}
assert.match(css, /data-theme\s*=\s*["']?dark/, "Dark theme must be included");
assert.match(css, /box-sizing:border-box/, "Include the same base reset as the docs");
assert.match(css, /@keyframes spin-slow/, "Loading animation must be included");
assert.doesNotMatch(css, /\.animated-lines|\.section-anchor/, "Do not ship documentation styles");
console.log(`CSS package checks passed (${Buffer.byteLength(css)} bytes; ${gzipSync(css).length} bytes gzip).`);
