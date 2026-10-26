import { readFile, writeFile } from "node:fs/promises";

// Flatten local imports so the published integration is independent of src/.
async function inlineStyles(url) {
  const source = await readFile(url, "utf8");
  let output = "";
  let offset = 0;
  for (const match of source.matchAll(/@import\s+"(\.\.?\/[^"\n]+\.css)"\s*;/g)) {
    output += source.slice(offset, match.index);
    output += await inlineStyles(new URL(match[1], url));
    offset = match.index + match[0].length;
  }
  return output + source.slice(offset);
}

const source = await inlineStyles(new URL("../src/lib/tailwind.css", import.meta.url));
const output = source.replace('@source "./**/*.{ts,tsx}";', '@source "./**/*.js";');
await writeFile(new URL("../dist/tailwind.css", import.meta.url), output);
console.log("Built Tailwind v4 integration: shared tokens, component sources, and no duplicate Preflight.");
