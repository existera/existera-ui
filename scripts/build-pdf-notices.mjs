import { copyFile, mkdir, readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
const require = createRequire(import.meta.url);
const source = path.dirname(require.resolve("pdfjs-dist/package.json"));
const destination = new URL("../dist/pdfjs-licenses/", import.meta.url);
await mkdir(destination, { recursive: true });
await copyFile(path.join(source, "LICENSE"), new URL("LICENSE", destination));
for (const folder of ["standard_fonts", "wasm"]) {
  for (const file of await readdir(path.join(source, folder))) {
    if (!file.startsWith("LICENSE")) continue;
    await copyFile(path.join(source, folder, file), new URL(`${folder}-${file}`, destination));
  }
}
console.log("Included PDF.js, font, and decoder license notices.");
