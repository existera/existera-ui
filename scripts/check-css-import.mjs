import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

// Use the exact CSS compiler dependency used by the Vite integration.
const require = createRequire(import.meta.resolve("@tailwindcss/vite"));
const { compile } = require("@tailwindcss/node");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));

assert.equal(pkg.exports["."].style, "./dist/tailwind.css");
assert.equal(pkg.style, pkg.exports["."].style);
assert.equal(import.meta.resolve("@existera/ui"), new URL("../dist/index.js", import.meta.url).href, "JavaScript must keep resolving to the component entry.");

const work = join(root, "work");
await mkdir(work, { recursive: true });
const fixture = await mkdtemp(join(work, "css-import-"));
assert.ok(fixture.startsWith(work + sep), "Keep the temporary consumer inside the workspace.");
try {
  const consumerPackage = join(fixture, "node_modules", "@existera", "ui");
  await mkdir(join(consumerPackage, "dist"), { recursive: true });
  await writeFile(join(consumerPackage, "package.json"), JSON.stringify(pkg));
  await writeFile(join(consumerPackage, "dist", "tailwind.css"), await readFile(join(root, "dist", "tailwind.css")));

  for (const entry of ["@existera/ui", "@existera/ui/tailwind.css"]) {
    const compiler = await compile(`@import "tailwindcss" source(none);\n@import "${entry}";`, {
      base: fixture,
      onDependency() {},
    });
    const css = compiler.build(["bg-primary", "text-muted-foreground", "dark:hidden", "h-[var(--height-md)]", "md:flex"]);
    assert.doesNotMatch(css, /@(theme|source|custom-variant)\s/, "Consumer CSS must be compiled.");
    for (const value of ["--height-md", "var(--color-primary)", "var(--color-muted)", 'data-theme="dark"', "@media"]) {
      assert.ok(css.includes(value), `${entry}: missing compiled token or utility ${value}`);
    }
  }
  console.log("CSS package import checks passed: root shorthand, explicit entry, and unchanged JavaScript resolution.");
} finally {
  await rm(fixture, { recursive: true, force: true });
}
