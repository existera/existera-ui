const assets = import.meta.glob<string>(
  ["/node_modules/pdfjs-dist/cmaps/*.bcmap", "/node_modules/pdfjs-dist/standard_fonts/*.{pfb,ttf}", "/node_modules/pdfjs-dist/wasm/*.wasm"],
  { query: "?url", import: "default" },
);
const directories: Record<string, string> = {
  cMapUrl: "cmaps",
  standardFontDataUrl: "standard_fonts",
  wasmUrl: "wasm",
};

export class PDFBinaryDataFactory {
  async fetch({ kind, filename }: { kind: string; filename: string }): Promise<Uint8Array> {
    const load = assets[`/node_modules/pdfjs-dist/${directories[kind]}/${filename}`];
    if (!load) throw new Error(`Unsupported PDF resource: ${filename}`);
    const url = await load();
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unable to load PDF resource: ${filename}`);
    return new Uint8Array(await response.arrayBuffer());
  }
}
