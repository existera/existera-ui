import assert from "node:assert/strict";
import { build } from "esbuild";

async function load(path) {
  const result = await build({ entryPoints: [new URL(path, import.meta.url).pathname.replace(/^\/(\w:)/, "$1")], bundle: true, write: false, format: "esm", platform: "node" });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`);
}
const { arrangeWidgets, updateWidget, overlaps, effectiveLimits, layoutRows } = await load("../src/lib/components/Widget/utils/widgetLayout.ts");
const { gridMetrics, resolveColumns, defaultBreakpoints, widgetBounds } = await load("../src/lib/components/Widget/utils/gridGeometry.ts");
const { pointerTarget } = await load("../src/lib/components/Widget/utils/widgetPointer.ts");
const original = [
  { id: "a", col: 0, row: 0, colSpan: 2, rowSpan: 1 },
  { id: "b", col: 2, row: 0, colSpan: 2, rowSpan: 1 },
  { id: "c", col: 2, row: 1, colSpan: 2, rowSpan: 2 },
];
const copy = structuredClone(original);
const moved = updateWidget(original, "a", { col: 2 }, 4);
assert.deepEqual(moved.map((item) => item.row), [0, 1, 2]);
assert.deepEqual(original, copy);
assert.equal(layoutRows(moved, 2), 4);
assert.equal(arrangeWidgets([original[0]], 1, { a: { minCol: 6 } })[0].colSpan, 1);
assert.deepEqual(effectiveLimits({ minRow: 3, maxRow: 1, minCol: 6, maxCol: 2 }, 4), { minCol: 4, minRow: 3, maxCol: 4, maxRow: 3 });
for (const size of [0, 32, 180, 320, 375, 480, 767, 768, 1024, 1400]) {
  const cols = resolveColumns(size, 12, true, defaultBreakpoints);
  assert.ok(cols >= 2 && cols <= 12);
  const grid = gridMetrics(size, cols, 8);
  assert.ok(Math.abs(grid.unit * cols + grid.gap * (cols - 1) - size) < 1e-8);
  for (const span of [1, 2, 4]) {
    const bounds = widgetBounds({ id: "x", row: 0, col: 0, rowSpan: span, colSpan: span }, grid);
    assert.equal(bounds.width, bounds.height, "Square spans must stay square at every size.");
  }
}
assert.equal(resolveColumns(375, 12, true, defaultBreakpoints), 2);
assert.equal(resolveColumns(479, 24, true, defaultBreakpoints), 2);
assert.equal(resolveColumns(480, 12, true, defaultBreakpoints), 6);
assert.equal(resolveColumns(900, 6, true, defaultBreakpoints), 6);
assert.equal(resolveColumns(375, 10, false, defaultBreakpoints), 10);

const grid = gridMetrics(600, 6, 8);
for (const size of [280, 320, 375, 479]) {
  const mobile = gridMetrics(size, 2, 8, 20, true);
  assert.equal(mobile.unit, (size - 8) / 2);
  assert.equal(mobile.unit, gridMetrics(size, 2, 8, 4, true).unit, "Extra mobile rows must not shrink the cells.");
  assert.equal(mobile.unit * 2 + mobile.gap, size);
}
assert.ok(gridMetrics(600, 6, 8, 12).unit < gridMetrics(600, 6, 8, 6).unit, "More rows must shrink cells inside the same square.");
assert.ok(gridMetrics(600, 12, 8, 6).unit < gridMetrics(600, 6, 8, 6).unit, "More columns must shrink cells inside the same square.");
assert.equal(gridMetrics(600, 4, 8, 12).unit, gridMetrics(600, 12, 8, 4).unit);
for (const size of [32, 320, 768]) {
  for (const rows of [4, 8, 16]) {
    const metrics = gridMetrics(size, 6, 8, rows);
    assert.ok(metrics.unit * rows + metrics.gap * (rows - 1) <= size + 1e-8);
    assert.ok(metrics.unit * 6 + metrics.gap * 5 <= size + 1e-8);
  }
}
const origin = { id: "a", col: 2, row: 1, colSpan: 2, rowSpan: 2 };
const bounds = widgetBounds(origin, grid);
const limits = { minCol: 1, maxCol: 3, minRow: 2, maxRow: 4 };
const growing = pointerTarget(origin, bounds, "resize", 9999, 9999, grid, limits);
assert.deepEqual(growing.patch, { colSpan: 3, rowSpan: 4 });
const shrinking = pointerTarget(origin, bounds, "resize", -9999, -9999, grid, limits);
assert.deepEqual(shrinking.patch, { colSpan: 1, rowSpan: 2 });
const dragging = pointerTarget(origin, bounds, "move", -9999, -9999, grid, limits);
assert.deepEqual(dragging.patch, { col: 0, row: 0 });
assert.equal(pointerTarget(origin, bounds, "move", 9999, 9999, grid, limits).patch.row, grid.rows - origin.rowSpan);
const fractional = pointerTarget(origin, bounds, "move", 4.25, 7.5, grid, limits);
assert.equal(fractional.pixels.x, bounds.x + 4.25, "Pointer geometry must not snap prematurely.");
assert.equal(fractional.pixels.y, bounds.y + 7.5);

let seed = 743;
function random(max) { seed = (seed * 1664525 + 1013904223) >>> 0; return seed % max; }
for (let run = 0; run < 400; run++) {
  const columns = 1 + random(12);
  const constraints = {};
  const items = Array.from({ length: 16 }, (_, i) => {
    constraints[String(i)] = { minCol: 1 + random(4), maxCol: 2 + random(6), minRow: 1 + random(2), maxRow: 2 + random(4) };
    return { id: String(i), col: random(14), row: random(6), colSpan: 1 + random(8), rowSpan: 1 + random(6) };
  });
  let result = arrangeWidgets(items, columns, constraints);
  result = updateWidget(result, String(random(16)), { colSpan: random(16), rowSpan: random(12) }, columns, constraints);
  result = arrangeWidgets(result, Math.max(1, columns - 2), constraints);
  result.forEach((item, i) => {
    const capacity = Math.max(1, columns - 2);
    const limits = effectiveLimits(constraints[item.id], capacity);
    assert.ok(item.col >= 0 && item.row >= 0 && item.col + item.colSpan <= capacity);
    assert.ok(item.colSpan >= limits.minCol && item.colSpan <= limits.maxCol);
    assert.ok(item.rowSpan >= limits.minRow && item.rowSpan <= limits.maxRow);
    result.slice(i + 1).forEach((other) => assert.equal(overlaps(item, other), false));
  });
}
console.log("PASS: square cells, responsive columns, fractional pointer geometry, bounds, collisions, immutability, and 400 constraint/reflow stress cases.");
