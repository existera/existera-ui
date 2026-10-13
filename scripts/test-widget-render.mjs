import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ExWidgetCard from "../dist/components/Widget/ExWidgetCard.js";
import ExWidgetContainer from "../dist/components/Widget/ExWidgetContainer.js";

const card = renderToStaticMarkup(createElement(ExWidgetCard, { widgetId: "headless", minRow: 2, maxRow: 4, minCol: 1, maxCol: 3 }, "Content"));
assert.ok(!/<header|<h[1-6]/.test(card));
assert.ok(!/background:|border:|box-shadow:|padding:/.test(card), "A headless card must not inject visual decoration.");
assert.ok(!/minRow=|maxRow=|minCol=|maxCol=/.test(card), "Constraints must not leak to HTML.");
assert.ok(card.includes('data-widget-content=""') && card.includes("overflow:auto"));

const markup = renderToStaticMarkup(createElement(ExWidgetContainer, {
  columns: 8, rows: 3, gap: 8, editable: false,
  defaultLayout: [
    { id: "a", row: 0, col: 0, rowSpan: 1, colSpan: 1 },
    { id: "b", row: 0, col: 1, rowSpan: 2, colSpan: 2 },
  ],
}, createElement(ExWidgetCard, { widgetId: "a" }, "A"), createElement(ExWidgetCard, { widgetId: "b" }, "B")));
assert.ok(markup.includes("display:grid"));
assert.ok(!markup.includes("aspect-ratio:1 / 1"), "Mobile height follows its rows instead of shrinking cells into a square workspace.");
const desktop = renderToStaticMarkup(createElement(ExWidgetContainer, { columns: 8, rows: 12, responsive: false }));
assert.ok(desktop.includes("aspect-ratio:1 / 1"), "Desktop retains the square workspace.");
assert.ok(markup.includes('data-columns="2"'));
assert.ok(markup.includes('data-rows="3"'));
assert.ok(markup.includes("100cqw"), "First render must have square CSS tracks before ResizeObserver runs.");
assert.ok(markup.includes("grid-column:1 / span 1") && markup.includes("grid-column:1 / span 2"));
assert.ok(!markup.includes("position:absolute"), "Cards must occupy real grid slots on first render.");
assert.ok(!markup.includes("data-widget-drag-handle") && !markup.includes("data-widget-resize-handle"));

const enabled = renderToStaticMarkup(createElement(ExWidgetContainer, null,
  createElement(ExWidgetCard, { widgetId: "fixed", draggable: false, resizable: true }, "Resize only")));
assert.ok(!enabled.includes("data-widget-drag-handle"));
assert.ok(enabled.includes("data-widget-resize-handle"));
console.log("PASS: headless markup, initial CSS Grid slots, square first-render tracks, scroll ownership, and disabled handles.");
