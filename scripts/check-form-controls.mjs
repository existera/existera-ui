import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";

const fields = ["Input", "Select", "Textarea", "ComboBox", "DatePicker", "DateRange", "TimeSelector", "InputOperator"];
for (const name of fields) {
  const { default: Component } = await import(`../dist/components/${name}/Ex${name}.js`);
  for (const state of ["default", "error", "success"]) {
    for (const size of ["xs", "sm", "md", "lg"]) {
      const html = renderToStaticMarkup(createElement(Component, { state, size, option: [] }));
      const document = new JSDOM(html).window.document;
      const boundaries = [...document.querySelectorAll("div")].filter(node => node.classList.contains("focus-within:outline-2"));
      assert.equal(boundaries.length, 1, `${name}/${size}/${state}: one focus boundary for the complete field`);
      const field = boundaries[0];
      assert.ok(field.classList.contains("bg-field"), `${name}: shared flat field background`);
      assert.ok(field.classList.contains(`border-${state === "default" ? "field-border" : state === "error" ? "danger" : "success"}`));
      assert.doesNotMatch(html, /shadow-\[inset/, `${name}: no inset shadow`);
    }
  }
  const disabled = new JSDOM(renderToStaticMarkup(createElement(Component, { disabled: true, state: "error", option: [] }))).window.document;
  const field = [...disabled.querySelectorAll("div")].find(node => node.classList.contains("bg-field") || node.classList.contains("bg-surface-2"));
  assert.ok(field.classList.contains("cursor-not-allowed"), `${name}: disabled field styling`);
  assert.ok(!field.classList.contains("hover:border-field-hover"), `${name}: disabled field has no hover affordance`);
  assert.ok(!field.classList.contains("border-danger"), `${name}: disabled overrides validation styling`);
  const full = renderToStaticMarkup(createElement(Component, { radius: "full", option: [] }));
  assert.match(full, /rounded-(?:full|\[var\(--radius-full-md\)\])/, `${name}: full radius preserved`);
}

const { default: Input } = await import("../dist/components/Input/ExInput.js");
const attached = new JSDOM(renderToStaticMarkup(createElement(Input, null,
  createElement(Input.Prefix, null, "https://"),
  createElement(Input.Suffix, null, ".com"),
))).window.document;
const input = attached.querySelector("input");
const outer = input.closest("div.focus-within\\:outline-2");
assert.ok(outer?.textContent.includes("https://") && outer.textContent.includes(".com"), "Prefix, editable content, and suffix share one focus boundary");
console.log("Form controls passed: all sizes/states, flat surfaces, one focus boundary, disabled styling, full radius, and attached labels.");
