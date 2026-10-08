import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { Link, MemoryRouter } from "react-router-dom";
import ExButton from "../dist/components/Button/ExButton.js";

test("existing buttons keep native form behavior", () => {
  const button = ExButton({ children: "Save" });
  assert.equal(button.type, "button");
  assert.equal(button.props.type, "button");
  const submit = ExButton({ type: "submit", form: "profile", loading: true });
  assert.equal(submit.props.type, "submit");
  assert.equal(submit.props.form, "profile");
  assert.equal(submit.props.disabled, true);
});

test("href renders a native link with anchor attributes", () => {
  const link = ExButton({ href: "/guide", target: "_blank", children: "Guide", download: "guide.html" });
  assert.equal(link.type, "a");
  const html = renderToStaticMarkup(link);
  assert.match(html, /href="\/guide"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /download="guide.html"/);
  assert.doesNotMatch(html, /\s(?:type|disabled)=/);
  assert.equal(ExButton({ href: "/guide", rel: "help" }).props.rel, "help");
});

test("enabled links preserve click events and native modifier-key navigation", () => {
  let received;
  const click = { ctrlKey: true, preventDefault() { throw new Error("Native navigation was prevented"); } };
  const link = ExButton({ href: "/guide", onClick: event => { received = event; } });
  link.props.onClick(click);
  assert.equal(received, click);
  const aux = ExButton({ href: "/guide", onAuxClick: event => { received = event; } });
  const middleClick = { button: 1 };
  aux.props.onAuxClick(middleClick);
  assert.equal(received, middleClick);
});

test("disabled and loading links cannot navigate or invoke click callbacks", () => {
  for (const state of [{ disabled: true }, { loading: true }]) {
    const unexpected = () => { throw new Error("Disabled callback invoked"); };
    const link = ExButton({ href: "/guide", tabIndex: 0, onClick: unexpected, onAuxClick: unexpected, ...state });
    assert.equal(link.props.href, undefined);
    assert.equal(link.props.tabIndex, -1);
    assert.equal(link.props["aria-disabled"], true);
    assert.equal(link.props.role, "link");
    assert.equal(link.props["aria-busy"], Boolean(state.loading));
    for (const handler of [link.props.onClick, link.props.onAuxClick]) {
      let prevented = false;
      let stopped = false;
      handler({ preventDefault() { prevented = true; }, stopPropagation() { stopped = true; } });
      assert.ok(prevented && stopped);
    }
    assert.doesNotMatch(renderToStaticMarkup(link), /\shref=/);
  }
});

test("link and button variants share identical styling", () => {
  for (const variant of ["solid", "soft", "outline", "text"]) {
    for (const size of ["xs", "sm", "md", "lg"]) {
      for (const color of ["primary", "secondary", "danger", "success", "warning"]) {
        const props = { variant, size, color, radius: "full", leftIcon: "+", children: "Continue" };
        assert.equal(ExButton(props).props.className, ExButton({ ...props, href: "/next" }).props.className);
      }
    }
  }
});

test("SPA links render the router component and preserve routing options", () => {
  const to = { pathname: "/dashboard", search: "?tab=profile", hash: "#details" };
  const state = { from: "settings" };
  let received;
  const link = ExButton({ as: Link, to, replace: true, state, preventScrollReset: true, onClick: event => { received = event; }, children: "Dashboard" });
  assert.equal(link.type, Link);
  assert.equal(link.props.to, to);
  assert.equal(link.props.state, state);
  assert.equal(link.props.replace, true);
  assert.equal(link.props.preventScrollReset, true);
  const event = { ctrlKey: true, preventDefault() { throw new Error("Router event intercepted"); } };
  link.props.onClick(event);
  assert.equal(received, event);
  const html = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: ["/settings"] }, link));
  assert.match(html, /href="\/dashboard\?tab=profile#details"/);
  assert.doesNotMatch(html, /\s(?:as|to|replace|state)=/);
  assert.equal(link.props.className, ExButton({ children: "Dashboard" }).props.className);
});

test("disabled SPA links do not mount the router or leak routing props", () => {
  for (const state of [{ disabled: true }, { loading: true }]) {
    const link = ExButton({ as: Link, to: "/dashboard", replace: true, state: { from: "settings" }, "aria-label": "Dashboard", ...state });
    assert.equal(link.type, "a");
    assert.equal(link.props["aria-label"], "Dashboard");
    assert.equal(link.props["aria-disabled"], true);
    assert.equal(link.props.tabIndex, -1);
    const html = renderToStaticMarkup(link);
    assert.doesNotMatch(html, /\s(?:href|to|replace|state|as)=/);
    let prevented = false;
    link.props.onClick({ preventDefault() { prevented = true; }, stopPropagation() {} });
    assert.ok(prevented);
  }
});
