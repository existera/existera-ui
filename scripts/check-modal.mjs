import assert from "node:assert/strict";
import test from "node:test";
import { activateFocusTrap, getFocusableElements } from "../dist/hooks/focusTrap.js";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ExModal from "../dist/components/Modal/ExModal.js";

// Small DOM model for focus-controller unit tests; not a browser-layout test.
class Element {
  constructor(document, tag = "button", props = {}) {
    this.ownerDocument = document;
    this.tagName = tag.toUpperCase();
    this.tabIndex = tag === "div" ? -1 : 0;
    this.children = [];
    this.parent = null;
    this.attrs = {};
    this.style = {};
    this.isConnected = true;
    Object.assign(this, props);
  }
  add(...children) { for (const child of children) { child.parent = this; this.children.push(child); } return this; }
  contains(element) { return element === this || this.children.some(child => child.contains(element)); }
  querySelectorAll() { return this.children.flatMap(child => [child, ...child.querySelectorAll()]); }
  matches(selector) { return selector === ":disabled" && Boolean(this.disabled); }
  closest(selector) {
    for (let element = this; element; element = element.parent) {
      if (element.hidden || element.inert || (selector.includes("aria-hidden") && element.attrs["aria-hidden"] === "true")) return element;
    }
    return null;
  }
  getClientRects() { return this.hidden ? [] : [{}]; }
  setAttribute(name, value) { this.attrs[name] = value; }
  removeAttribute(name) { delete this.attrs[name]; }
  focus() { this.ownerDocument.activeElement = this; this.ownerDocument.emit("focusin", {}); }
}
function fixture() {
  const listeners = new Map();
  const document = {
    documentElement: { style: { overflow: "auto" } },
    defaultView: { getComputedStyle: element => ({ visibility: element.style.visibility ?? "visible" }) },
    addEventListener(type, listener) { if (!listeners.has(type)) listeners.set(type, new Set()); listeners.get(type).add(listener); },
    removeEventListener(type, listener) { listeners.get(type)?.delete(listener); },
    emit(type, event) { for (const listener of [...(listeners.get(type) ?? [])]) listener(event); },
  };
  const trigger = new Element(document);
  document.activeElement = trigger;
  const container = new Element(document, "div");
  const first = new Element(document);
  const last = new Element(document, "input");
  container.add(new Element(document, "div").add(first), new Element(document, "div").add(last));
  const key = (name, shiftKey = false, extra = {}) => {
    const event = { key: name, shiftKey, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, stopPropagation() {}, ...extra };
    document.emit("keydown", event);
    return event;
  };
  return { document, trigger, container, first, last, key, listeners };
}

test("Tab navigates nested controls and wraps in both directions", () => {
  const f = fixture();
  const close = activateFocusTrap(f.container);
  assert.equal(f.document.activeElement, f.first);
  f.key("Tab"); assert.equal(f.document.activeElement, f.last);
  f.key("Tab"); assert.equal(f.document.activeElement, f.first);
  f.key("Tab", true); assert.equal(f.document.activeElement, f.last);
  close();
  assert.equal(f.document.activeElement, f.trigger);
});

test("hidden and disabled controls are skipped, aria-hidden=false stays focusable", () => {
  const f = fixture();
  f.first.setAttribute("aria-hidden", "false");
  f.container.add(new Element(f.document, "input", { disabled: true }), new Element(f.document, "button", { hidden: true }));
  assert.deepEqual(getFocusableElements(f.container), [f.first, f.last]);
});

test("focus escaping the dialog is redirected and dynamic controls are discovered", () => {
  const f = fixture();
  const close = activateFocusTrap(f.container, { initialFocus: f.last });
  assert.equal(f.document.activeElement, f.last);
  f.trigger.focus(); assert.equal(f.document.activeElement, f.last);
  const added = new Element(f.document);
  f.container.add(added);
  f.key("Tab"); assert.equal(f.document.activeElement, added);
  close();
});

test("a dialog without focusable children focuses itself", () => {
  const f = fixture();
  f.container.children = [];
  const close = activateFocusTrap(f.container);
  assert.equal(f.document.activeElement, f.container);
  f.key("Tab"); assert.equal(f.document.activeElement, f.container);
  close();
});

test("only the top modal handles Escape and scroll remains locked until all close", () => {
  const f = fixture();
  let parentCalls = 0;
  let childCalls = 0;
  const closeParent = activateFocusTrap(f.container, { onEscape: () => parentCalls++ });
  const child = new Element(f.document, "div").add(new Element(f.document));
  const closeChild = activateFocusTrap(child, { onEscape: () => childCalls++ });
  f.key("Escape");
  assert.equal(parentCalls, 0); assert.equal(childCalls, 1);
  closeChild();
  assert.equal(f.document.documentElement.style.overflow, "hidden");
  assert.equal(f.document.activeElement, f.first);
  f.key("Escape"); assert.equal(parentCalls, 1);
  closeParent();
  assert.equal(f.document.documentElement.style.overflow, "auto");
});

test("closing a lower modal does not steal focus or unlock the page", () => {
  const f = fixture();
  const closeParent = activateFocusTrap(f.container);
  const childButton = new Element(f.document);
  const child = new Element(f.document, "div").add(childButton);
  const closeChild = activateFocusTrap(child, { returnFocus: f.trigger });
  closeParent();
  assert.equal(f.document.activeElement, childButton);
  assert.equal(f.document.documentElement.style.overflow, "hidden");
  closeChild();
  assert.equal(f.document.activeElement, f.trigger);
  assert.equal(f.document.documentElement.style.overflow, "auto");
});

test("cleanup is idempotent, removes listeners, and makes exiting DOM inert", () => {
  const f = fixture();
  let calls = 0;
  const close = activateFocusTrap(f.container, { onEscape: () => calls++ });
  f.key("Escape", false, { defaultPrevented: true });
  f.key("Escape", false, { isComposing: true });
  assert.equal(calls, 0);
  close(); close();
  assert.equal(f.container.inert, true);
  assert.equal(f.container.attrs["aria-hidden"], "true");
  assert.ok([...f.listeners.values()].every(set => set.size === 0));
  const reopen = activateFocusTrap(f.container);
  assert.equal(f.container.inert, false);
  assert.equal(f.document.activeElement, f.first);
  reopen();
});

test("server rendering does not access document or create a portal", () => {
  assert.equal(renderToStaticMarkup(createElement(ExModal, { isOpen: true, "aria-label": "Example" }, "Content")), "");
});
