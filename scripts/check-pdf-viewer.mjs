import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { PDFBinaryDataFactory } from "../dist/components/PDFViewer/PDFAssets.js";
import ExPDFViewer from "../dist/components/PDFViewer/ExPDFViewer.js";

assert.equal(renderToString(createElement(ExPDFViewer, { name: "sample.pdf", url: "/sample.pdf", onClose() {} })), "", "SSR must not load the browser renderer");
const factory = new PDFBinaryDataFactory();
for (const [kind, filename] of [["cMapUrl", "Adobe-Japan1-UCS2.bcmap"], ["standardFontDataUrl", "LiberationSans-Regular.ttf"], ["wasmUrl", "openjpeg.wasm"]]) {
  assert.ok((await factory.fetch({ kind, filename })).byteLength > 0, `${filename} packaged without a CDN`);
}
const bytes = new Uint8Array(await readFile(new URL("../public/dummy1.pdf", import.meta.url)));
const task = getDocument({ data: bytes, BinaryDataFactory: PDFBinaryDataFactory, useWorkerFetch: false, disableWorkerRendering: true });
try {
  const pdf = await task.promise;
  assert.ok(pdf.numPages > 0);
  for (const number of new Set([1, pdf.numPages])) {
    const page = await pdf.getPage(number);
    for (const rotation of [0, 90]) {
      const viewport = page.getViewport({ scale: 0.75, rotation });
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
      await page.render({ canvas, viewport }).promise;
      const pixels = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
      assert.ok(pixels.some((value, index) => index % 4 !== 3 && value < 245), "Page must contain rendered content");
    }
    assert.ok((await page.getTextContent()).items.length > 0, "Page text available for screen readers");
    const viewport = page.getViewport({ scale: 1 });
    const rendering = page.render({ canvas: createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height)), viewport });
    rendering.cancel();
    await assert.rejects(rendering.promise, { name: "RenderingCancelledException" });
  }
  console.log(`PDF reader checks passed: SSR, bundled resources, ${pdf.numPages} page(s), rotation, rendering, text, cancellation.`);
} finally {
  await task.destroy();
}
const invalid = getDocument({ data: new Uint8Array([1, 2, 3]) });
try { await assert.rejects(invalid.promise); }
finally { await invalid.destroy(); }
console.log("Invalid PDF rejection passed.");


// A real three-page PDF exercises page changes independently of the one-page demo.
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R 5 0 R 7 0 R] /Count 3 >>",
];
for (let page = 1; page <= 3; page++) {
  const content = `BT /F1 18 Tf 36 140 Td (Reader page ${page}) Tj ET`;
  objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 240 180] /Resources << /Font << /F1 9 0 R >> >> /Contents ${page * 2 + 2} 0 R >>`);
  objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
}
objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
let source = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((object, index) => { offsets.push(source.length); source += `${index + 1} 0 obj\n${object}\nendobj\n`; });
const xref = source.length;
source += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const offset of offsets.slice(1)) source += `${String(offset).padStart(10, "0")} 00000 n \n`;
source += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
const multiTask = getDocument({ data: new TextEncoder().encode(source), BinaryDataFactory: PDFBinaryDataFactory, useWorkerFetch: false, disableWorkerRendering: true });
try {
  const pdf = await multiTask.promise;
  assert.equal(pdf.numPages, 3);
  for (const number of [1, 3, 2]) {
    const page = await pdf.getPage(number);
    const text = await page.getTextContent();
    assert.ok(text.items.some(item => item.str === `Reader page ${number}`));
    const viewport = page.getViewport({ scale: 1 });
    await page.render({ canvas: createCanvas(viewport.width, viewport.height), viewport }).promise;
  }
  await assert.rejects(pdf.getPage(4));
  console.log("Three-page PDF: first/last/middle rendering and out-of-range rejection passed.");
} finally { await multiTask.destroy(); }
