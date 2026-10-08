import assert from "node:assert/strict";
import test from "node:test";
import { createElement, isValidElement, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import DatePicker from "../dist/components/DatePicker/ExDatePicker.js";
import Calendar from "../dist/components/DatePicker/ExDatePickerCalendar.js";
import { parseDate } from "../dist/components/DatePicker/utils/parseDate.js";

function find(node, predicate) {
  if (Array.isArray(node)) return node.map(child => find(child, predicate)).find(Boolean);
  if (!isValidElement(node)) return undefined;
  return predicate(node) ? node : find(node.props.children, predicate);
}
const input = tree => find(tree, node => node.type === "input");
const calendar = tree => find(tree, node => node.type === Calendar);
const clear = tree => find(tree, node => node.props["aria-label"] === "Clear date");

// Real React state with render retries; the portal is inspected, not mounted.
function renderSteps(initial, steps = []) {
  let tree;
  let cursor = 0;
  function Harness() {
    const [props, setProps] = useState(initial);
    tree = DatePicker(props);
    if (cursor < steps.length) {
      const next = steps[cursor++](tree);
      setProps(current => ({ ...current, ...next }));
    }
    return input(tree);
  }
  renderToStaticMarkup(createElement(Harness));
  return tree;
}

test("controlled date and open calendar follow parent changes and reset", () => {
  const calls = [];
  const result = renderSteps({ value: "08-10-2026", onChange: date => calls.push(date), clearable: true }, [
    tree => { input(tree).props.onFocus(); },
    tree => { assert.equal(calendar(tree).props.value, "08-10-2026"); return { value: "12-11-2026" }; },
    tree => { assert.equal(input(tree).props.value, "12-11-2026"); assert.equal(calendar(tree).props.value, "12-11-2026"); assert.equal(calendar(tree).key, "DD-MM-YYYY:12-11-2026"); return { value: "" }; },
  ]);
  assert.equal(input(result).props.value, "");
  assert.equal(clear(result), undefined);
  assert.deepEqual(calls, []);
});

test("selection notifies both APIs without overriding a controlled value", () => {
  const changes = [];
  const legacy = [];
  const result = renderSteps({ value: "08-10-2026", onChange: date => changes.push(date), onType: date => legacy.push(date) }, [
    tree => { input(tree).props.onFocus(); },
    tree => { calendar(tree).props.onSelect("12-11-2026"); },
  ]);
  assert.equal(input(result).props.value, "08-10-2026");
  assert.equal(calendar(result), undefined);
  assert.deepEqual(changes, ["12-11-2026"]);
  assert.deepEqual(legacy, ["12-11-2026"]);
});

test("uncontrolled selection updates and both clear actions emit empty strings", () => {
  const calls = [];
  const result = renderSteps({ defaultValue: "08-10-2026", onChange: date => calls.push(date), clearable: true }, [
    tree => { assert.equal(input(tree).props.value, "08-10-2026"); input(tree).props.onFocus(); },
    tree => { calendar(tree).props.onSelect("12-11-2026"); },
    tree => { assert.equal(input(tree).props.value, "12-11-2026"); clear(tree).props.onClick(); },
    tree => { assert.equal(input(tree).props.value, ""); input(tree).props.onClick(); },
    tree => { calendar(tree).props.onSelect("20-12-2026"); },
    tree => { input(tree).props.onClick(); },
    tree => { calendar(tree).props.onClear(); },
  ]);
  assert.equal(input(result).props.value, "");
  assert.deepEqual(calls, ["12-11-2026", "", "20-12-2026", ""]);
});

test("disabled inputs cannot open the calendar", () => {
  const result = renderSteps({ disabled: true, defaultValue: "08-10-2026", clearable: true }, [
    tree => { input(tree).props.onFocus(); input(tree).props.onClick(); },
  ]);
  assert.equal(calendar(result), undefined);
  assert.equal(clear(result), undefined);
  assert.equal(input(result).props.value, "08-10-2026");
});

test("explicit undefined clears a controlled date", () => {
  const result = renderSteps({ value: "08-10-2026" }, [() => ({ value: undefined })]);
  assert.equal(input(result).props.value, "");
});

test("clear cancels a pending debounced onType selection", async () => {
  const changes = [];
  const legacy = [];
  renderSteps({ debounce: 15, clearable: true, onChange: date => changes.push(date), onType: date => legacy.push(date) }, [
    tree => { input(tree).props.onFocus(); },
    tree => { calendar(tree).props.onSelect("12-11-2026"); },
    tree => { clear(tree).props.onClick(); },
  ]);
  await new Promise(resolve => setTimeout(resolve, 40));
  assert.deepEqual(changes, ["12-11-2026", ""]);
  assert.deepEqual(legacy, [""]);
});

test("date parsing rejects invalid dates and accepts leap years in both formats", () => {
  assert.equal(parseDate("31-02-2026", "DD-MM-YYYY"), undefined);
  assert.equal(parseDate("2026-02-29", "YYYY-MM-DD"), undefined);
  assert.equal(parseDate("invalid", "DD-MM-YYYY"), undefined);
  assert.equal(parseDate("2026-13-01", "YYYY-MM-DD"), undefined);
  assert.equal(parseDate("29-02-2024", "DD-MM-YYYY").getDate(), 29);
  assert.equal(parseDate("2024-02-29", "YYYY-MM-DD").getMonth(), 1);
});

test("Today cannot bypass date bounds or disabledDate", () => {
  const format = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const oldDocument = globalThis.document;
  // createPortal only needs a valid container node here; no DOM is rendered.
  globalThis.document = { body: { nodeType: 1 } };
  try {
    for (const bounds of [{ startDate: format(tomorrow) }, { endDate: format(yesterday) }, { disabledDate: [format(now)] }]) {
      let portal;
      let calls = 0;
      function Harness() {
        portal = Calendar({ open: true, format: "YYYY-MM-DD", value: "invalid", triggerRef: { current: null }, contentRef: { current: null }, onSelect: () => { calls++; }, ...bounds });
        return null;
      }
      renderToStaticMarkup(createElement(Harness));
      const today = find(portal.children, node => node.type === "button" && node.props.children === "Today");
      assert.equal(today.props.disabled, true);
      today.props.onClick();
      assert.equal(calls, 0);
    }
  } finally {
    if (oldDocument === undefined) delete globalThis.document;
    else globalThis.document = oldDocument;
  }
});
