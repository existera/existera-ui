import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../dist/style.css", import.meta.url), "utf8");

assert.doesNotMatch(css, /@(theme|source|utility|custom-variant|tailwind)\b/, "Package CSS must be compiled for direct browser use.");
assert.match(css, /@layer utilities\s*\{/, "Package CSS must contain the component utilities.");
for (const size of ["xs", "sm", "md", "lg"]) {
  assert.match(css, new RegExp(`--height-${size}\\s*:\\s*\\d+px`), `Shared ${size} height token must be included.`);
  assert.ok(css.includes(`var(--height-${size})`), `Shared ${size} height token must be used by compiled utilities.`);
}

console.log("Standalone CSS checks passed: compiled utilities and shared control height tokens.");
