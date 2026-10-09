import ts from "typescript";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");

async function fixDeclarations(directory) {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await fixDeclarations(filePath);
      continue;
    }

    if (!entry.name.endsWith(".d.ts")) continue;

    const original = await readFile(filePath, "utf8");

    const sourceFile = ts.createSourceFile(filePath, original, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

    const changes = [];

    function fixSpecifier(node) {
      if (!ts.isStringLiteral(node)) return;

      const specifier = node.text;

      if (!specifier.startsWith("./") && !specifier.startsWith("../")) {
        return;
      }

      if (/\.(js|mjs|cjs|json)$/.test(specifier)) {
        return;
      }

      changes.push({
        start: node.getStart(sourceFile) + 1,
        end: node.getEnd() - 1,
        value: `${specifier}.js`,
      });
    }

    function visit(node) {
      // import / export declarations
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) {
        fixSpecifier(node.moduleSpecifier);
      }

      // TypeScript inline import:
      // import("./props/ExToastProps").ToastItemProps
      if (ts.isImportTypeNode(node)) {
        const argument = node.argument;

        if (ts.isLiteralTypeNode(argument) && ts.isStringLiteral(argument.literal)) {
          fixSpecifier(argument.literal);
        }
      }

      // Dynamic import expressions
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments.length === 1) {
        fixSpecifier(node.arguments[0]);
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    let updated = original;

    for (const change of changes.sort((a, b) => b.start - a.start)) {
      updated = updated.slice(0, change.start) + change.value + updated.slice(change.end);
    }

    if (original !== updated) {
      await writeFile(filePath, updated, "utf8");

      console.log(`Fixed ${changes.length} imports: ${path.relative(distDir, filePath)}`);
    }
  }
}

await fixDeclarations(distDir);
