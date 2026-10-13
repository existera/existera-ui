import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent, RefObject } from "react";
import type { ExWidgetAction, ExWidgetLayout, ExWidgetLayoutItem } from "../types/ExWidgetType";
import type { GridMetrics, WidgetBounds } from "../utils/gridGeometry";
import { widgetBounds } from "../utils/gridGeometry";
import type { WidgetConstraintMap } from "../utils/widgetLayout";
import { layoutRows, sameLayout, updateWidget } from "../utils/widgetLayout";
import { pointerTarget } from "../utils/widgetPointer";
import { useWidgetCallback } from "./useWidgetCallback";

export interface WidgetInteraction {
  id: string;
  origin: ExWidgetLayoutItem;
  pixels: WidgetBounds;
  phase: "drag" | "settle";
}

interface Session {
  id: string;
  pointerId: number;
  action: ExWidgetAction;
  target: HTMLButtonElement;
  x: number;
  y: number;
  left: number;
  top: number;
  origin: ExWidgetLayoutItem;
  bounds: WidgetBounds;
  layout: ExWidgetLayout;
  next: ExWidgetLayout;
  started: boolean;
}

export function useWidgetInteraction({ root, layout, metrics, constraints, editable, revision, commit }: {
  root: RefObject<HTMLDivElement | null>;
  layout: ExWidgetLayout;
  metrics: GridMetrics;
  constraints: WidgetConstraintMap;
  editable: boolean;
  revision: string;
  commit: (next: ExWidgetLayout, id: string, action: ExWidgetAction) => void;
}) {
  const session = useRef<Session | null>(null);
  const frame = useRef<number | null>(null);
  const [interaction, setInteraction] = useState<WidgetInteraction | null>(null);
  const [preview, setPreview] = useState<ExWidgetLayout | null>(null);
  const [message, setMessage] = useState("");

  const release = useCallback(() => {
    const active = session.current;
    session.current = null;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    if (active?.target.hasPointerCapture(active.pointerId)) active.target.releasePointerCapture(active.pointerId);
  }, []);

  const cancel = useCallback(() => {
    release();
    setPreview(null);
    setInteraction(null);
  }, [release]);

  useEffect(() => {
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && session.current) { cancel(); setMessage("Widget change cancelled."); }
    };
    const hide = () => { if (document.hidden) cancel(); };
    window.addEventListener("keydown", escape);
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", hide);
    return () => {
      release();
      window.removeEventListener("keydown", escape);
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", hide);
    };
  }, [cancel, release]);

  // A changed grid, constraint, child, or edit mode invalidates pointer coordinates.
  useEffect(() => () => cancel(), [revision, editable, cancel]);
  const layoutRevision = JSON.stringify(layout);
  useEffect(() => () => {
    // External controlled updates must not be overwritten by a stale drag snapshot.
    // A normal drop already released the session, so its settling animation survives.
    if (session.current) cancel();
  }, [layoutRevision, cancel]);

  function start(event: PointerEvent<HTMLButtonElement>, id: string, action: ExWidgetAction) {
    if (!editable || event.button !== 0 || !event.isPrimary || session.current || interaction || !root.current || metrics.step <= 0) return;
    const origin = layout.find((item) => item.id === id);
    if (!origin) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = root.current.getBoundingClientRect();
    session.current = { id, action, origin, target: event.currentTarget, pointerId: event.pointerId,
      x: event.clientX, y: event.clientY, left: rect.left, top: rect.top,
      bounds: widgetBounds(origin, metrics), layout, next: layout, started: false };
  }

  function update(clientX: number, clientY: number) {
    const active = session.current;
    if (!active || !root.current) return;
    const rect = root.current.getBoundingClientRect();
    const dx = clientX - active.x - (rect.left - active.left);
    const dy = clientY - active.y - (rect.top - active.top);
    if (!active.started && Math.hypot(dx, dy) < 4) return;
    active.started = true;
    const { pixels, patch } = pointerTarget(active.origin, active.bounds, active.action, dx, dy, metrics, constraints[active.id]);
    const previous = active.next.find((item) => item.id === active.id)!;
    if (Object.entries(patch).some(([key, value]) => previous[key as "row" | "col" | "rowSpan" | "colSpan"] !== value)) {
      const candidate = updateWidget(active.layout, active.id, patch, metrics.columns, constraints);
      // Keep the square workspace stable during a gesture; reject placements that cannot fit.
      if (layoutRows(candidate, metrics.rows) <= metrics.rows) {
        active.next = candidate;
        setPreview(active.next);
      }
    }
    setInteraction({ id: active.id, origin: active.origin, pixels, phase: "drag" });
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    if (session.current?.pointerId !== event.pointerId) return;
    const { clientX, clientY } = event;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => { frame.current = null; update(clientX, clientY); });
  }

  function finish(event: PointerEvent<HTMLButtonElement>, aborted = false) {
    const active = session.current;
    if (!active || active.pointerId !== event.pointerId) return;
    if (aborted) { cancel(); return; }
    update(event.clientX, event.clientY);
    release();
    if (!active.started) return;
    const next = active.next;
    const changed = !sameLayout(next, active.layout);
    const finalItem = next.find((item) => item.id === active.id)!;
    setPreview(null);
    // Keep the original grid slot until the visual has settled, then rebase without a jump.
    setInteraction({ id: active.id, origin: active.origin, pixels: widgetBounds(finalItem, metrics), phase: "settle" });
    if (changed) commit(next, active.id, active.action);
    setMessage(`${active.id}: column ${finalItem.col + 1}, row ${finalItem.row + 1}, ${finalItem.colSpan} columns by ${finalItem.rowSpan} rows.`);
  }

  function keyboard(event: KeyboardEvent<HTMLButtonElement>, id: string, action: ExWidgetAction) {
    if (!editable || session.current || interaction || event.altKey || event.ctrlKey || event.metaKey) return;
    const delta: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const direction = delta[event.key];
    const item = layout.find((entry) => entry.id === id);
    if (!direction || !item) return;
    event.preventDefault();
    const patch = action === "move" ? { col: item.col + direction[0], row: Math.min(metrics.rows - item.rowSpan, item.row + direction[1]) }
      : { colSpan: item.colSpan + direction[0], rowSpan: Math.min(metrics.rows - item.row, item.rowSpan + direction[1]) };
    const next = updateWidget(layout, id, patch, metrics.columns, constraints);
    if (sameLayout(layout, next) || layoutRows(next, metrics.rows) > metrics.rows) return;
    commit(next, id, action);
    const result = next.find((entry) => entry.id === id)!;
    setMessage(`${id}: column ${result.col + 1}, row ${result.row + 1}, ${result.colSpan} columns by ${result.rowSpan} rows.`);
  }

  const stableStart = useWidgetCallback(start);
  const stableMove = useWidgetCallback(move);
  const stableFinish = useWidgetCallback(finish);
  const stableKeyboard = useWidgetCallback(keyboard);
  const settled = useCallback(() => setInteraction((current) => current?.phase === "settle" ? null : current), []);
  useEffect(() => {
    if (interaction?.phase !== "settle") return;
    // Also releases the gesture when reduced motion or an unchanged target skips animation.
    const timer = window.setTimeout(settled, 700);
    return () => window.clearTimeout(timer);
  }, [interaction?.phase, settled]);
  return { interaction, preview, message, start: stableStart, move: stableMove,
    finish: stableFinish, keyboard: stableKeyboard, settled };
}
