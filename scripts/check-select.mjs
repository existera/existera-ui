import assert from "node:assert/strict";
import test from "node:test";
import { createElement, isValidElement, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ExSelect from "../dist/components/Select/ExSelect.js";

const one = { label: "One", value: "1" };
const two = { label: "Two", value: "2" };
const option = [one, two];

function find(node, predicate) {
  if (Array.isArray(node)) return node.map(child => find(child, predicate)).find(Boolean);
  if (!isValidElement(node)) return undefined;
  return predicate(node) ? node : find(node.props.children, predicate);
}

// Exercise real React state and event handlers with server render retries.
// This verifies state transitions, not browser layout or native popup behavior.
function renderSteps(initial, steps = []) {
  let tree;
  let cursor = 0;
  function Harness() {
    const [props, setProps] = useState(initial);
    tree = ExSelect(props);
    if (cursor < steps.length) {
      const step = steps[cursor++];
      const next = step(tree);
      setProps(current => ({ ...current, ...next }));
    }
    return tree;
  }
  const html = renderToStaticMarkup(createElement(Harness));
  return { tree, html };
}
const select = tree => find(tree, node => node.type === "select");
const clear = tree => find(tree, node => node.type === "button" && node.props["aria-label"] === "Clear selection");
const change = (tree, value) => select(tree).props.onChange({ target: { value } });

test("controlled selection follows parent updates and resets without emitting changes", () => {
  const calls = [];
  const result = renderSteps({ option, selected: one, clearable: true, onChange: value => calls.push(value) }, [
    tree => { assert.equal(select(tree).props.value, "1"); return { selected: two }; },
    tree => { assert.equal(select(tree).props.value, "2"); return { selected: null }; },
    tree => { assert.equal(select(tree).props.value, ""); assert.equal(clear(tree), undefined); return { selected: one }; },
    () => ({ selected: undefined }),
  ]);
  assert.equal(select(result.tree).props.value, "");
  assert.deepEqual(calls, []);
});

test("controlled user changes notify parent but do not override its value", () => {
  const calls = [];
  const result = renderSteps({ option, selected: one, clearable: true, onChange: value => calls.push(value) }, [
    tree => { change(tree, "2"); },
    tree => { assert.equal(select(tree).props.value, "1"); clear(tree).props.onClick(); },
  ]);
  assert.equal(select(result.tree).props.value, "1");
  assert.deepEqual(calls, [two, null]);
});

test("uncontrolled selection supports initial value, user changes, and clearing", () => {
  const calls = [];
  const result = renderSteps({ option, defaultSelected: one, clearable: true, onChange: value => calls.push(value) }, [
    tree => { assert.equal(select(tree).props.value, "1"); change(tree, "2"); },
    tree => { assert.equal(select(tree).props.value, "2"); return { defaultSelected: null }; },
    tree => { assert.equal(select(tree).props.value, "2"); clear(tree).props.onClick(); },
  ]);
  assert.equal(select(result.tree).props.value, "");
  assert.equal(clear(result.tree), undefined);
  assert.deepEqual(calls, [two, null]);
});

test("explicit undefined remains controlled when the parent clears", () => {
  const calls = [];
  const result = renderSteps({ option, selected: undefined, onChange: value => calls.push(value) }, [
    tree => { change(tree, "2"); },
  ]);
  assert.equal(select(result.tree).props.value, "");
  assert.deepEqual(calls, [two]);
});

test("disabled selection cannot change or emit callbacks", () => {
  const result = renderSteps({ option, defaultSelected: one, disabled: true, clearable: true, onChange() { throw new Error("Disabled callback"); } }, [
    tree => { assert.equal(clear(tree), undefined); change(tree, "2"); },
  ]);
  assert.equal(select(result.tree).props.value, "1");
  assert.equal(select(result.tree).props.disabled, true);
});

test("async options resolve by value and removed selections show the placeholder", () => {
  const result = renderSteps({ option: [], selected: one, clearable: true }, [
    tree => { assert.equal(select(tree).props.value, ""); return { option }; },
    tree => { assert.equal(select(tree).props.value, "1"); return { option: [two] }; },
  ]);
  assert.equal(select(result.tree).props.value, "");
  assert.equal(clear(result.tree), undefined);
});

test("native select exposes form and accessible attributes without duplicate combobox roles", () => {
  const { tree, html } = renderSteps({ option, selected: one, id: "country", name: "country", required: true, state: "error", "aria-label": "Country", "aria-describedby": "country-error" });
  assert.equal(select(tree).props["aria-label"], "Country");
  assert.equal(select(tree).props["aria-invalid"], true);
  assert.match(html, /name="country"/);
  assert.match(html, /required=""/);
  assert.match(html, /aria-describedby="country-error"/);
  assert.doesNotMatch(html, /role="combobox"|aria-expanded|one-time-code|inputMode/);
});
