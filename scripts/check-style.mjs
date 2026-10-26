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

const integration = await readFile(new URL("../dist/tailwind.css", import.meta.url), "utf8");
assert.match(integration, /@theme\s*\{/, "The Tailwind integration must register design tokens.");
assert.match(integration, /@source\s+"\.\/\*\*\/\*\.js"/, "The integration must scan the distributed component modules.");
assert.match(integration, /@custom-variant dark/, "Dark utilities must follow data-theme.");
assert.doesNotMatch(integration, /@import/, "The integration must be self-contained and must not import a second Tailwind reset.");
console.log("Tailwind integration checks passed: shared compiler tokens, component sources, and data-theme dark mode.");
