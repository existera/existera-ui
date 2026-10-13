"use client";

import { Children, isValidElement, useId, useMemo, useState } from "react";
import type { ReactElement } from "react";
import { cn } from "../../utils/Utils";
import ExWidgetItem from "./ExWidgetItem";
import type { ExWidgetCardProps } from "./props/ExWidgetCardProps";
import type { ExWidgetContainerProps } from "./props/ExWidgetContainerProps";
import type { ExWidgetAction, ExWidgetLayout } from "./types/ExWidgetType";
import { useWidgetMetrics } from "./hooks/useWidgetMetrics";
import { useWidgetInteraction } from "./hooks/useWidgetInteraction";
import { defaultBreakpoints, gridMetrics, integer, resolveColumns } from "./utils/gridGeometry";
import { arrangeWidgets, layoutRows } from "./utils/widgetLayout";

const emptyLayout: ExWidgetLayout = [];

export default function ExWidgetContainer({
  layout,
  defaultLayout = emptyLayout,
  onLayoutChange,
  columns = 12,
  rows = 4,
  gap = 8,
  responsive = true,
  breakpoints = defaultBreakpoints,
  editable = true,
  children,
  className,
  style,
  ...props
}: ExWidgetContainerProps) {
  const { root, size } = useWidgetMetrics();
  const [internal, setInternal] = useState(defaultLayout);
  const instructionsId = useId();
  const count = resolveColumns(size, columns, responsive, breakpoints);
  const cards = useMemo(
    () =>
      Children.toArray(children).filter(
        (child): child is ReactElement<ExWidgetCardProps> =>
          isValidElement<ExWidgetCardProps>(child) && typeof child.props.widgetId === "string",
      ),
    [children],
  );

  const constraints = useMemo(
    () =>
      Object.fromEntries(
        cards.map(({ props: card }) => [
          card.widgetId,
          { minRow: card.minRow, maxRow: card.maxRow, minCol: card.minCol, maxCol: card.maxCol },
        ]),
      ),
    [cards],
  );

  const ids = cards.map((card) => card.props.widgetId);
  if (new Set(ids).size !== ids.length) throw new Error("ExWidgetContainer requires unique widgetId values.");

  const source = layout ?? internal;

  const current = useMemo(() => {
    let nextRow = 0;
    const items: ExWidgetLayout = [];
    for (const { props: card } of cards) {
      const supplied = source.find((entry) => entry.id === card.widgetId);
      const item = supplied ?? { id: card.widgetId, col: 0, row: nextRow, rowSpan: integer(card.rowSpan), colSpan: integer(card.colSpan) };
      nextRow = Math.max(nextRow, item.row + item.rowSpan);
      items.push(item);
    }
    return arrangeWidgets(items, count, constraints);
  }, [source, cards, count, constraints]);

  const rowCount = layoutRows(current, rows);
  const mobile = responsive && (size === null || size < 480);
  const metrics = useMemo(() => gridMetrics(size ?? 0, count, gap, rowCount, mobile), [size, count, gap, rowCount, mobile]);

  function commit(next: ExWidgetLayout, widgetId: string, action: ExWidgetAction) {
    if (layout === undefined) setInternal(next);
    onLayoutChange?.(
      next.map((item) => ({ ...item })),
      { widgetId, action, columns: count, rows: layoutRows(next, rows) },
    );
  }

  const controls = useWidgetInteraction({
    root,
    layout: current,
    metrics,
    constraints,
    editable,
    revision: JSON.stringify([
      size,
      count,
      rows,
      rowCount,
      gap,
      constraints,
      cards.map((card) => [card.props.widgetId, card.props.draggable, card.props.resizable]),
    ]),
    commit,
  });

  const displayed = controls.preview ?? current;
  const active = controls.interaction;
  const divisions = mobile ? count : Math.max(count, rowCount);
  const gridGap = size === null ? integer(gap, 8, 0) : metrics.gap;
  const unit = size === null ? `max(0px, calc((100cqw - ${(divisions - 1) * gridGap}px) / ${divisions}))` : `${metrics.unit}px`;

  return (
    <div {...props} className={cn(className)} style={{ minWidth: 0, containerType: "inline-size", ...style }}>
      <p id={instructionsId} className="sr-only">
        Drag the top handle to move; drag the corner to resize. Use arrow keys on a handle for one grid step. Escape cancels a pointer
        gesture.
      </p>
      <div
        ref={root}
        data-widget-container=""
        data-columns={count}
        data-rows={rowCount}
        style={{
          display: "grid",
          position: "relative",
          minWidth: 0,
          aspectRatio: mobile ? undefined : "1 / 1",
          overflow: "hidden",
          alignContent: "start",
          justifyContent: "start",
          gap: gridGap,
          gridTemplateColumns: `repeat(${count}, ${unit})`,
          gridTemplateRows: `repeat(${rowCount}, ${unit})`,
          gridAutoRows: unit,
        }}>
        {cards.map((card) => {
          const id = card.props.widgetId;
          const item = displayed.find((entry) => entry.id === id)!;
          return (
            <ExWidgetItem
              key={id}
              item={item}
              metrics={metrics}
              interaction={active?.id === id ? active : null}
              editable={editable}
              instructionsId={instructionsId}
              start={controls.start}
              move={controls.move}
              finish={controls.finish}
              keyboard={controls.keyboard}
              settled={controls.settled}>
              {card}
            </ExWidgetItem>
          );
        })}
      </div>
      <span role="status" aria-live="polite" className="sr-only">
        {controls.message}
      </span>
    </div>
  );
}
