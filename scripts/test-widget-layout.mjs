import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { transform } from "esbuild";

const source = await readFile(new URL("../src/lib/components/Widget/widgetLayout.ts", import.meta.url), "utf8");
const { code } = await transform(source, { loader: "ts", format: "esm" });
const { arrangeWidgets, updateWidget, overlaps } = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);

const original = [
  { id: "a", x: 0, y: 0, w: 2, h: 1 },
  { id: "b", x: 2, y: 0, w: 2, h: 1 },
  { id: "c", x: 2, y: 1, w: 2, h: 2 },
];
const snapshot = structuredClone(original);
const moved = updateWidget(original, "a", { x: 2 }, 4);
assert.equal(moved[0].x, 2);
assert.equal(moved[0].y, 0);
assert.equal(moved[1].y, 1);
assert.equal(moved[2].y, 2);
assert.deepEqual(original, snapshot, "Preview must not mutate the committed layout (Escape can restore it).");
assert.deepEqual(updateWidget(original, "a", { x: 0, y: 0 }, 4), original);
const bounded = arrangeWidgets([{ id: "a", x: -2, y: -3, w: 20, h: 1, minH: 2, maxW: 3 }], 4)[0];
assert.deepEqual([bounded.x, bounded.y, bounded.w, bounded.h], [0, 0, 3, 2]);
assert.equal(arrangeWidgets([{ ...original[0], minW: 3 }], 1)[0].w, 1);

// Deterministic stress coverage for reflow, resizing, and repeated collisions.
let seed = 743;
function random(max) { seed = (seed * 1664525 + 1013904223) >>> 0; return seed % max; }
for (let run = 0; run < 300; run++) {
  const columns = 1 + random(8);
  const items = Array.from({ length: 12 }, (_, i) => ({ id: String(i), x: random(10), y: random(6), w: 1 + random(6), h: 1 + random(4) }));
  const result = updateWidget(arrangeWidgets(items, columns), String(random(12)), { x: random(10), w: 1 + random(8), h: 1 + random(5) }, columns);
  result.forEach((item, i) => {
    assert.ok(item.x >= 0 && item.y >= 0 && item.w >= 1 && item.h >= 1 && item.x + item.w <= columns);
    result.slice(i + 1).forEach((other) => assert.equal(overlaps(item, other), false));
  });
}
console.log("Widget layout: bounds, collision chains, immutability, responsive reflow, and 300 stress cases passed.");
