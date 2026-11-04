"use client";

import { useContext } from "react";
import { GripHorizontal, MoveDiagonal2, Settings2 } from "lucide-react";
import ExButton from "../Button/ExButton";
import ExDropdown from "../Dropdown/ExDropdown";
import { cn } from "../../utils/Utils";
import { ExWidgetContext } from "./ExWidgetContext";
import type { ExWidgetCardProps } from "./props/ExWidgetCardProps";
import type { ExWidgetAction } from "./types/ExWidgetType";

export default function ExWidgetCard({
  widgetId,
  rowSpan: _rowSpan,
  colSpan: _colSpan,
  minRow: _minRow,
  maxRow: _maxRow,
  minCol: _minCol,
  maxCol: _maxCol,
  draggable = true,
  resizable = true,
  moveLabel,
  resizeLabel,
  dragHandleClassName,
  resizeHandleClassName,
  children,
  className,
  style,
  ...props
}: ExWidgetCardProps) {
  const context = useContext(ExWidgetContext);
  const label = props["aria-label"] ?? widgetId;

  void [_rowSpan, _colSpan, _minRow, _maxRow, _minCol, _maxCol];
  const handlers = (action: ExWidgetAction) => ({
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => context?.start(event, action),
    onPointerMove: context?.move,
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => context?.finish(event),
    onPointerCancel: (event: React.PointerEvent<HTMLButtonElement>) => context?.finish(event, true),
    onLostPointerCapture: (event: React.PointerEvent<HTMLButtonElement>) => context?.finish(event, true),
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => context?.keyboard(event, action),
    "aria-describedby": context?.instructionsId,
  });

  return (
    <div
      {...props}
      role={props.role ?? (props["aria-label"] || props["aria-labelledby"] ? "group" : undefined)}
      data-widget-card={widgetId}
      data-active={context?.active || undefined}
      className={cn("ex-widget-card", className)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        minHeight: 0,
        height: "100%",
        overflow: "hidden",
        ...style,
      }}>
      <div
        data-widget-content=""
        className="ex-widget-scroll"
        style={{ flex: "1 1 0%", minWidth: 0, minHeight: 0, overflow: "auto", overscrollBehavior: "contain" }}>
        {children}
      </div>
      {context?.editable && (draggable || resizable) && (
        <div className="ex-widget-actions absolute bottom-0 left-0 z-10">
          <ExDropdown>
            <ExDropdown.Trigger>
              <ExButton variant="text" color="secondary" iconOnly size="xs" aria-label={`Adjust ${label}`}>
                <Settings2 size={14} />
              </ExButton>
            </ExDropdown.Trigger>
            <ExDropdown.Content>
              {draggable && (
                <>
                  <ExDropdown.Item onSelect={() => context.adjust("move", "ArrowLeft")}>Move left</ExDropdown.Item>
                  <ExDropdown.Item onSelect={() => context.adjust("move", "ArrowRight")}>Move right</ExDropdown.Item>
                  <ExDropdown.Item onSelect={() => context.adjust("move", "ArrowUp")}>Move up</ExDropdown.Item>
                  <ExDropdown.Item onSelect={() => context.adjust("move", "ArrowDown")}>Move down</ExDropdown.Item>
                </>
              )}
              {resizable && (
                <>
                  <ExDropdown.Item onSelect={() => context.adjust("resize", "ArrowLeft")}>Make narrower</ExDropdown.Item>
                  <ExDropdown.Item onSelect={() => context.adjust("resize", "ArrowRight")}>Make wider</ExDropdown.Item>
                  <ExDropdown.Item onSelect={() => context.adjust("resize", "ArrowUp")}>Make shorter</ExDropdown.Item>
                  <ExDropdown.Item onSelect={() => context.adjust("resize", "ArrowDown")}>Make taller</ExDropdown.Item>
                </>
              )}
            </ExDropdown.Content>
          </ExDropdown>
        </div>
      )}
      {context?.editable && draggable && (
        <button
          type="button"
          {...handlers("move")}
          data-widget-drag-handle=""
          aria-label={moveLabel ?? `Move ${label}`}
          className={cn("ex-widget-handle", dragHandleClassName)}
          style={{ top: 0, right: 0, cursor: "grab" }}>
          <GripHorizontal size={14} aria-hidden="true" />
        </button>
      )}
      {context?.editable && resizable && (
        <button
          type="button"
          {...handlers("resize")}
          data-widget-resize-handle=""
          aria-label={resizeLabel ?? `Resize ${label}`}
          className={cn("ex-widget-handle", resizeHandleClassName)}
          style={{ bottom: 0, right: 0, cursor: "nwse-resize" }}>
          <MoveDiagonal2 size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
