"use client";

import { Children, isValidElement, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent, ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/Utils";
import { ExWidgetContext } from "./ExWidgetContext";
import type { ExWidgetCardProps } from "./props/ExWidgetCardProps";
import type { ExWidgetContainerProps } from "./props/ExWidgetContainerProps";
import type { ExWidgetAction, ExWidgetLayout, ExWidgetLayoutItem } from "./types/ExWidgetType";
import { arrangeWidgets, gridNumber, updateWidget } from "./widgetLayout";

interface Gesture {
  id: string;
  pointerId: number;
  action: ExWidgetAction;
  origin: ExWidgetLayoutItem;
  layout: ExWidgetLayout;
  next: ExWidgetLayout;
  x: number;
  y: number;
  left: number;
  top: number;
  columnStep: number;
  rowStep: number;
  columns: number;
  target: HTMLButtonElement;
  started: boolean;
  bounds: { x: number; y: number; width: number; height: number };
}

interface WidgetBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

const settleTransition = { type: "spring" as const, stiffness: 420, damping: 38, mass: 0.8 };

export default function ExWidgetContainer({
  layout,
  defaultLayout = [],
  onLayoutChange,
  columns = 4,
  rowHeight = 160,
  gap = 12,
  minColumnWidth = 150,
  editable = true,
  children,
  className,
  style,
  ...props
}: ExWidgetContainerProps) {
  const root = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const frame = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const [internal, setInternal] = useState(defaultLayout);
  const [preview, setPreview] = useState<ExWidgetLayout | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [floating, setFloating] = useState<WidgetBounds | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const instructionsId = useId();
  const spacing = gridNumber(gap, 12, 0);
  const height = gridNumber(rowHeight, 160);
  const columnLimit = gridNumber(columns, 4);
  const count =
    width === null
      ? columnLimit
      : Math.max(1, Math.min(columnLimit, Math.floor((width + spacing) / (gridNumber(minColumnWidth, 150) + spacing))));
  const cards = Children.toArray(children).filter(
    (child): child is ReactElement<ExWidgetCardProps> =>
      isValidElement<ExWidgetCardProps>(child) && typeof child.props.widgetId === "string",
  );
  const ids = cards.map((card) => card.props.widgetId);
  if (new Set(ids).size !== ids.length) throw new Error("ExWidgetContainer requires a unique widgetId for each card.");
  const source = layout ?? internal;

  const initialBottom = source.reduce((bottom, item) => Math.max(bottom, item.y + item.h), 0);

  const current = arrangeWidgets(
    cards.map(
      (card, index) =>
        source.find((item) => item.id === card.props.widgetId) ?? {
          id: card.props.widgetId,
          x: index % count,
          y: initialBottom + Math.floor(index / count),
          w: 1,
          h: 1,
        },
    ),
    count,
  );

  const displayed = preview ?? current;
  const columnStep = ((width ?? 0) + spacing) / count;
  const rowStep = height + spacing;

  const boundsFor = (item: ExWidgetLayoutItem): WidgetBounds => ({
    x: item.x * columnStep,
    y: item.y * rowStep,
    width: Math.max(0, item.w * columnStep - spacing),
    height: item.h * rowStep - spacing,
  });

  const placeholder = activeId ? displayed.find((item) => item.id === activeId) : undefined;

  const layoutHeight = Math.max(
    0,
    ...displayed.map((item) => (item.y + item.h) * rowStep - spacing),
    ...(activeId ? current.map((item) => (item.y + item.h) * rowStep - spacing) : []),
    floating ? floating.y + floating.height : 0,
  );

  function clearGesture() {
    const session = gesture.current;
    gesture.current = null;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    if (session?.target.hasPointerCapture(session.pointerId)) session.target.releasePointerCapture(session.pointerId);
    setPreview(null);
    setActiveId(null);
    setFloating(null);
  }

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    let previousWidth = -1;

    const observer = new ResizeObserver(([entry]) => {
      if (Math.abs(previousWidth - entry.contentRect.width) < 0.5) return;
      previousWidth = entry.contentRect.width;
      setWidth(entry.contentRect.width);
      clearGesture();
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  useEffect(() => {
    const cancel = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && gesture.current) {
        clearGesture();
        setAnnouncement("Widget change cancelled.");
      }
    };
    window.addEventListener("keydown", cancel);

    const blur = () => clearGesture();
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("blur", blur);
    };
  }, []);

  function commit(next: ExWidgetLayout, id: string) {
    if (JSON.stringify(next) === JSON.stringify(current)) return;
    if (layout === undefined) setInternal(next);
    onLayoutChange?.(next.map((item) => ({ ...item })));
    const item = next.find((entry) => entry.id === id);
    if (item) setAnnouncement(`${id}: column ${item.x + 1}, row ${item.y + 1}, size ${item.w} by ${item.h}.`);
  }

  function start(event: PointerEvent<HTMLButtonElement>, id: string, action: ExWidgetAction) {
    if (!editable || event.button !== 0 || !event.isPrimary || gesture.current || !root.current) return;
    const item = current.find((entry) => entry.id === id);
    if (!item) return;

    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);

    const rect = root.current.getBoundingClientRect();
    const cardRect = event.currentTarget.closest("[data-widget-id]")?.getBoundingClientRect();
    const bounds = cardRect
      ? { x: cardRect.left - rect.left, y: cardRect.top - rect.top, width: cardRect.width, height: cardRect.height }
      : boundsFor(item);

    gesture.current = {
      id,
      pointerId: event.pointerId,
      action,
      origin: item,
      layout: current,
      next: current,
      x: event.clientX,
      y: event.clientY,
      left: rect.left,
      top: rect.top,
      columnStep: ((width ?? rect.width) + spacing) / count,
      rowStep: height + spacing,
      columns: count,
      target: event.currentTarget,
      started: false,
      bounds,
    };
  }

  function updatePointer(clientX: number, clientY: number) {
    const session = gesture.current;
    if (!session || !root.current) return;

    const rect = root.current.getBoundingClientRect();

    const dx = clientX - session.x - (rect.left - session.left);
    const dy = clientY - session.y - (rect.top - session.top);

    if (!session.started && Math.hypot(dx, dy) < 4) return;
    session.started = true;

    const item = session.origin;
    const minW = Math.min(session.columns - item.x, gridNumber(item.minW ?? 1));
    const maxW = Math.max(minW, Math.min(session.columns - item.x, gridNumber(item.maxW ?? session.columns)));
    const minH = gridNumber(item.minH ?? 1);
    const maxH = Math.max(minH, gridNumber(item.maxH ?? Number.MAX_SAFE_INTEGER));

    const pixels =
      session.action === "move"
        ? {
            ...session.bounds,
            x: Math.max(0, Math.min((session.columns - item.w) * session.columnStep, session.bounds.x + dx)),
            y: Math.max(0, session.bounds.y + dy),
          }
        : {
            ...session.bounds,
            width: Math.max(minW * session.columnStep - spacing, Math.min(maxW * session.columnStep - spacing, session.bounds.width + dx)),
            height: Math.max(minH * session.rowStep - spacing, Math.min(maxH * session.rowStep - spacing, session.bounds.height + dy)),
          };

    const patch =
      session.action === "move"
        ? { x: Math.round(pixels.x / session.columnStep), y: Math.round(pixels.y / session.rowStep) }
        : { w: Math.round((pixels.width + spacing) / session.columnStep), h: Math.round((pixels.height + spacing) / session.rowStep) };

    const previous = session.next.find((entry) => entry.id === session.id)!;

    if (Object.entries(patch).some(([key, value]) => previous[key as "x" | "y" | "w" | "h"] !== value)) {
      session.next = updateWidget(session.layout, session.id, patch, session.columns);
      setPreview(session.next);
    }

    setActiveId(session.id);
    setFloating(pixels);
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    if (gesture.current?.pointerId !== event.pointerId) return;

    const { clientX, clientY } = event;

    if (frame.current !== null) cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      updatePointer(clientX, clientY);
    });
  }

  function finish(event: PointerEvent<HTMLButtonElement>, cancel = false) {
    const session = gesture.current;
    if (!session || session.pointerId !== event.pointerId) return;

    if (!cancel) updatePointer(event.clientX, event.clientY);

    clearGesture();
    if (!cancel && session.started && editable && count === session.columns) commit(session.next, session.id);
  }

  function keyboard(event: KeyboardEvent<HTMLButtonElement>, id: string, action: ExWidgetAction) {
    if (!editable || gesture.current || event.altKey || event.ctrlKey || event.metaKey) return;

    const delta: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const direction = delta[event.key];
    const item = current.find((entry) => entry.id === id);

    if (!direction || !item) return;
    event.preventDefault();

    commit(
      updateWidget(
        current,
        id,
        action === "move"
          ? { x: item.x + direction[0], y: item.y + direction[1] }
          : { w: Math.min(count - item.x, item.w + direction[0]), h: item.h + direction[1] },
        count,
      ),
      id,
    );
  }

  return (
    <div {...props} className={cn("min-w-0", className)} style={style}>
      <p id={instructionsId} className="sr-only">
        Drag the move handle to reposition a widget. Drag the corner to resize. Use arrow keys on either handle for one grid step. Press
        Escape to cancel a pointer gesture.
      </p>
      <div
        ref={root}
        data-widget-container=""
        data-columns={count}
        className="relative min-w-0"
        style={
          width === null
            ? { display: "grid", gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`, gridAutoRows: height, gap: spacing }
            : { height: layoutHeight }
        }>
        {placeholder && width !== null && (
          <motion.div
            aria-hidden="true"
            data-widget-placeholder=""
            className="pointer-events-none absolute left-0 top-0 rounded-[var(--radius-full-md)] border-2 border-dashed border-border bg-surface-3"
            initial={false}
            animate={{ ...boundsFor(placeholder) }}
            transition={reduceMotion ? { duration: 0 } : settleTransition}
          />
        )}
        {cards.map((card) => {
          const id = card.props.widgetId;
          const item = displayed.find((entry) => entry.id === id) ?? current.find((entry) => entry.id === id)!;
          const bounds = activeId === id && floating ? floating : boundsFor(item);
          return (
            <ExWidgetContext.Provider
              key={id}
              value={{
                editable,
                active: activeId === id,
                instructionsId,
                start: (event, action) => start(event, id, action),
                move,
                finish,
                keyboard: (event, action) => keyboard(event, id, action),
              }}>
              <motion.div
                data-widget-id={id}
                className="min-h-0 min-w-0"
                initial={false}
                animate={width === null ? undefined : { ...bounds }}
                transition={activeId === id || reduceMotion ? { duration: 0 } : settleTransition}
                style={
                  width === null
                    ? { gridColumn: `${item.x + 1} / span ${item.w}`, gridRow: `${item.y + 1} / span ${item.h}` }
                    : {
                        ...bounds,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        zIndex: activeId === id ? 20 : 1,
                        willChange: activeId === id ? "transform, width, height" : undefined,
                      }
                }>
                {card}
              </motion.div>
            </ExWidgetContext.Provider>
          );
        })}
      </div>
      <span role="status" aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </div>
  );
}
