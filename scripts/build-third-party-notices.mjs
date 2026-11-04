import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(new URL("../package.json", import.meta.url));
const manifest = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const destination = path.join(root, "dist", "third-party-licenses");
const names = new Set([...Object.keys(manifest.dependencies), ...Object.keys(manifest.peerDependencies)]);

// preserveModules emits bundled dependency code under dist/node_modules.
for (const entry of await readdir(path.join(root, "dist", "node_modules"), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  if (entry.name.startsWith("@")) {
    for (const child of await readdir(path.join(root, "dist", "node_modules", entry.name), { withFileTypes: true })) {
      if (child.isDirectory()) names.add(`${entry.name}/${child.name}`);
    }
  } else names.add(entry.name);
}
// Refractor's bundled grammars originate from Prism.
names.add("prismjs");

async function packageDirectory(name) {
  try { return path.dirname(require.resolve(`${name}/package.json`)); }
  catch {
    let directory = path.dirname(require.resolve(name));
    while (directory !== path.dirname(directory)) {
      try {
        const pkg = JSON.parse(await readFile(path.join(directory, "package.json"), "utf8"));
        if (pkg.name === name) return directory;
      } catch { /* The entry point may be inside a nested directory. */ }
      directory = path.dirname(directory);
    }
    throw new Error(`Cannot locate license source for ${name}`);
  }
}

await mkdir(destination, { recursive: true });
const records = [];
for (const name of [...names].sort()) {
  const source = await packageDirectory(name);
  const pkg = JSON.parse(await readFile(path.join(source, "package.json"), "utf8"));
  const folder = `${name.replaceAll("/", "__")}@${pkg.version}`;
  const target = path.join(destination, folder);
  await mkdir(target, { recursive: true });
  const files = (await readdir(source, { withFileTypes: true }))
    .filter(entry => entry.isFile() && /^(licen[sc]e|copying|notice|copyright)/i.test(entry.name))
    .map(entry => entry.name);
  if (!files.some(file => /^(licen[sc]e|copying)/i.test(file))) {
    throw new Error(`Missing full license for ${name}@${pkg.version}; review before distribution.`);
  }
  for (const file of files) await copyFile(path.join(source, file), path.join(target, file));
  records.push({ name, version: pkg.version, license: pkg.license, directory: folder, files });
}
await writeFile(path.join(destination, "index.json"), `${JSON.stringify(records, null, 2)}\n`);
await writeFile(path.join(destination, "README.md"), [
  "# Third-party licenses", "",
  "Original license and attribution files copied without modification from the installed packages.",
  "Versions and file paths are recorded in index.json. PDF.js font and decoder notices are also included in ../pdfjs-licenses/.", "",
  ...records.map(record => `- ${record.name}@${record.version} (${record.license}): ${record.directory}/`), "",
].join("\n"));
console.log(`Included original licenses and notices for ${records.length} direct, peer, and bundled packages.`);
