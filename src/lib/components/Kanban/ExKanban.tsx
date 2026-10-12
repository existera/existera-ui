"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { cn } from "../../utils/Utils";
import ExKanbanCardView from "./ExKanbanCard";
import ExKanbanColumnView from "./ExKanbanColumn";
import type { ExKanbanProps } from "./props/ExKanbanProps";
import type { ExKanbanCard, ExKanbanColumn } from "./types/ExKanbanType";
import { parseKanbanChildren, orderKanbanColumns } from "./utils/ExKanbanComposition";
import { moveKanbanCard } from "./utils/ExKanbanUtils";

interface DragState {
  cardId: string;
  columnId: string;
  index: number;
  keyboard: boolean;
}

export default function ExKanban({
  columns: controlledColumns,
  children,
  onChange,
  onCardClick,
  renderCard,
  size = "md",
  disabled = false,
  className,
  "aria-label": label = "Kanban board",
}: ExKanbanProps) {
  const composition = parseKanbanChildren(children);
  const [order, setOrder] = useState<Array<{ id: string; cards: string[] }> | null>(null);
  const columns = controlledColumns ?? orderKanbanColumns(composition.columns, order);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<{ id: number; x: number; y: number; cardId: string; columnId: string; index: number } | null>(null);
  const suppressClickRef = useRef(false);
  const previewRef = useRef<{ element: HTMLElement; offsetX: number; offsetY: number } | null>(null);
  const previewFrameRef = useRef<number | null>(null);
  const latestPointRef = useRef({ x: 0, y: 0 });

  useEffect(
    () => () => {
      previewRef.current?.element.remove();
      if (previewFrameRef.current !== null) cancelAnimationFrame(previewFrameRef.current);
    },
    [],
  );

  const removePreview = () => {
    previewRef.current?.element.remove();
    previewRef.current = null;
    if (previewFrameRef.current !== null) cancelAnimationFrame(previewFrameRef.current);
    previewFrameRef.current = null;
  };

  const movePreview = (x: number, y: number) => {
    latestPointRef.current = { x, y };

    if (previewFrameRef.current !== null) return;

    previewFrameRef.current = requestAnimationFrame(() => {
      previewFrameRef.current = null;

      const preview = previewRef.current;

      if (preview) {
        preview.element.style.transform =
          "translate3d(" + (latestPointRef.current.x - preview.offsetX) + "px," + (latestPointRef.current.y - preview.offsetY) + "px,0)";
      }
    });
  };

  const dragRef = useRef<DragState | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const instructionsId = useId();
  const readOnly = disabled || (controlledColumns !== undefined && !onChange);

  const update = (next: DragState | null) => {
    const previous = dragRef.current;
    if (
      previous?.cardId === next?.cardId &&
      previous?.columnId === next?.columnId &&
      previous?.index === next?.index &&
      previous?.keyboard === next?.keyboard
    )
      return;
    dragRef.current = next;
    setDrag(next);
  };

  const cancel = () => {
    removePreview();
    pointerRef.current = null;
    update(null);
    setAnnouncement("Move cancelled.");
  };

  const commit = () => {
    removePreview();

    if (dragRef.current && !dragRef.current.keyboard) suppressClickRef.current = true;

    const active = dragRef.current;
    pointerRef.current = null;
    update(null);

    if (!active || readOnly) return;
    const result = moveKanbanCard(columns, active.cardId, active.columnId, active.index);

    if (result) {
      if (controlledColumns === undefined)
        setOrder(result.columns.map((column) => ({ id: column.id, cards: column.cards.map((card) => card.id) })));
      onChange?.(result.columns, result.move);
      setAnnouncement(
        `${result.move.card.title} moved to ${columns.find((column) => column.id === active.columnId)?.title}, position ${result.move.toIndex + 1}.`,
      );
    } else {
      setAnnouncement("Card position unchanged.");
    }

    requestAnimationFrame(() =>
      Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-kanban-card]") ?? [])
        .find((button) => button.dataset.kanbanCard === active.cardId)
        ?.focus({ preventScroll: true }),
    );
  };
  const pointerDown = (event: PointerEvent<HTMLElement>, card: ExKanbanCard, column: ExKanbanColumn, index: number) => {
    if (event.button !== 0 || readOnly || card.disabled || column.disabled || dragRef.current) return;
    if (!event.isPrimary) return;

    const target = event.target as HTMLElement;
    const interactive = target.closest('button, a, input, textarea, select, [contenteditable="true"], [data-kanban-no-drag]');

    if (interactive && !interactive.hasAttribute("data-kanban-title")) return;
    suppressClickRef.current = false;

    pointerRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, cardId: card.id, columnId: column.id, index };
  };
  const pointerMove = (event: PointerEvent<HTMLElement>) => {
    const pending = pointerRef.current;

    if (!pending || pending.id !== event.pointerId) return;
    if (!dragRef.current && Math.hypot(event.clientX - pending.x, event.clientY - pending.y) < 5) return;
    event.preventDefault();

    if (!event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
    suppressClickRef.current = true;

    const board = rootRef.current;
    if (!board) return;

    if (!previewRef.current) {
      const original = event.currentTarget.closest<HTMLElement>("[data-kanban-card]");

      if (original) {
        const rect = original.getBoundingClientRect();
        const copy = original.cloneNode(true) as HTMLElement;
        const computed = getComputedStyle(original);

        for (let index = 0; index < computed.length; index++) {
          const property = computed.item(index);
          if (property.startsWith("--")) copy.style.setProperty(property, computed.getPropertyValue(property));
        }

        for (const element of [copy, ...Array.from(copy.querySelectorAll<HTMLElement>("*"))]) {
          element.removeAttribute("id");
          element.removeAttribute("aria-describedby");
          element.removeAttribute("data-kanban-card");
        }

        const theme = original.closest<HTMLElement>("[data-theme]")?.dataset.theme;
        if (theme) copy.dataset.theme = theme;

        copy.setAttribute("aria-hidden", "true");
        copy.inert = true;

        const offsetX = pending.x - rect.left;
        const offsetY = pending.y - rect.top;

        Object.assign(copy.style, {
          position: "fixed",
          left: "0",
          top: "0",
          width: rect.width + "px",
          height: rect.height + "px",
          margin: "0",
          pointerEvents: "none",
          zIndex: "9999",
          opacity: "1",
          boxSizing: "border-box",
          fontFamily: computed.fontFamily,
          color: computed.color,
          boxShadow: "0 20px 45px rgba(0,0,0,.24), 0 0 0 1px var(--color-primary)",
          transform: "translate3d(" + (event.clientX - offsetX) + "px," + (event.clientY - offsetY) + "px,0)",
          transition: "none",
          willChange: "transform",
        });
        document.body.appendChild(copy);
        previewRef.current = { element: copy, offsetX, offsetY };
        setAnnouncement("Card picked up. Drag to a column or press Escape to cancel.");
      }
    }

    movePreview(event.clientX, event.clientY);

    const bounds = board.getBoundingClientRect();

    if (event.clientX < bounds.left + 40) board.scrollLeft -= 18;
    if (event.clientX > bounds.right - 40) board.scrollLeft += 18;

    const target = document
      .elementsFromPoint(event.clientX, event.clientY)
      .map((element) => element.closest<HTMLElement>("[data-kanban-column]"))
      .find((element) => element && board.contains(element));
    const column = columns.find((item) => item.id === target?.dataset.kanbanColumn);

    if (!target || !column || column.disabled) {
      update({ cardId: pending.cardId, columnId: "", index: 0, keyboard: false });
      return;
    }

    const list = target.querySelector<HTMLElement>("[data-kanban-list]");

    if (list) {
      const rect = list.getBoundingClientRect();
      if (event.clientY < rect.top + 35) list.scrollTop -= 14;
      if (event.clientY > rect.bottom - 35) list.scrollTop += 14;
    }

    const cards = Array.from(target.querySelectorAll<HTMLElement>("[data-kanban-card]")).filter(
      (element) => element.dataset.kanbanCard !== pending.cardId,
    );

    const index = cards.findIndex((element) => {
      const rect = element.getBoundingClientRect();
      return event.clientY < rect.top + rect.height / 2;
    });

    update({ cardId: pending.cardId, columnId: column.id, index: index < 0 ? cards.length : index, keyboard: false });
  };
  const keyboard = (event: KeyboardEvent<HTMLElement>, card: ExKanbanCard, column: ExKanbanColumn, index: number) => {
    if (event.target !== event.currentTarget || readOnly || card.disabled || column.disabled) return;
    const active = dragRef.current;

    if (!active && (event.key === " " || event.key === "Enter")) {
      event.preventDefault();
      update({ cardId: card.id, columnId: column.id, index, keyboard: true });
      setAnnouncement(`${card.title} picked up. Use arrow keys, Enter to drop, Escape to cancel.`);
      return;
    }

    if (active && event.key === "Escape") {
      event.preventDefault();
      cancel();
      return;
    }

    if (!active?.keyboard || active.cardId !== card.id) return;

    if (event.key === "Escape" || event.key === "Tab") {
      if (event.key === "Escape") event.preventDefault();
      cancel();
      return;
    }

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      commit();
      return;
    }

    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();

    const available = columns.filter((item) => !item.disabled);

    let target = available.find((item) => item.id === active.columnId) ?? column;
    let nextIndex = active.index;

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const position = available.indexOf(target) + (event.key === "ArrowRight" ? 1 : -1);
      target = available[Math.max(0, Math.min(position, available.length - 1))];
    } else {
      nextIndex += event.key === "ArrowDown" ? 1 : -1;
    }

    nextIndex = Math.max(0, Math.min(nextIndex, target.cards.filter((item) => item.id !== card.id).length));

    update({ ...active, columnId: target.id, index: nextIndex });
    setAnnouncement(`${target.title}, position ${nextIndex + 1}.`);

    Array.from(rootRef.current?.querySelectorAll<HTMLElement>("[data-kanban-column]") ?? [])
      .find((element) => element.dataset.kanbanColumn === target.id)
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const marker = (
    <div aria-hidden="true" className="relative my-2 h-1 rounded-full bg-primary shadow-[0_0_0_3px_var(--color-primary-soft)]" />
  );

  return (
    <div
      className={cn("min-w-0", className)}
      onPointerDownCapture={() => {
        suppressClickRef.current = false;
      }}
      onClickCapture={(event) => {
        if (event.detail > 0 && suppressClickRef.current) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onKeyDownCapture={(event) => {
        if (event.key === "Escape" && dragRef.current && !dragRef.current.keyboard) {
          event.preventDefault();
          event.stopPropagation();
          cancel();
        }
      }}>
      <p id={instructionsId} className="sr-only">
        Drag anywhere on a card. With the keyboard press Space to pick up, arrows to move, Enter to drop, Escape to cancel.
      </p>

      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </p>

      <div ref={rootRef} role="region" aria-label={label} className="ex-textarea-scroll flex items-stretch gap-4 overflow-x-auto pb-4">
        {columns.length === 0 && (
          <p className="w-full rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted">No columns to display.</p>
        )}

        {columns.map((column) => {
          let visibleIndex = 0;
          return (
            <ExKanbanColumnView
              {...composition.columnProps.get(column.id)}
              key={column.id}
              column={column}
              size={size}
              active={drag?.columnId === column.id}
              readOnly={readOnly}>
              {column.cards.map((card, index) => {
                const moving = drag?.cardId === card.id;
                const position = visibleIndex;
                if (!moving) visibleIndex++;
                const locked = readOnly || column.disabled || card.disabled;
                return (
                  <Fragment key={card.id}>
                    {!moving && drag?.columnId === column.id && drag.index === position && marker}
                    <ExKanbanCardView
                      {...composition.cardProps.get(card.id)}
                      card={card}
                      size={size}
                      moving={moving}
                      locked={Boolean(locked)}
                      renderCard={renderCard ?? composition.cardProps.get(card.id)?.renderCard}
                      onCardClick={
                        onCardClick ? (selected) => onCardClick(selected, column) : composition.cardProps.get(card.id)?.onCardClick
                      }
                      tabIndex={locked ? undefined : 0}
                      aria-label={card.title}
                      aria-describedby={locked ? undefined : instructionsId}
                      onKeyDown={(event) => keyboard(event, card, column, index)}
                      style={{ touchAction: locked ? "auto" : "none" }}
                      onPointerDown={(event) => pointerDown(event, card, column, index)}
                      onPointerMove={pointerMove}
                      onPointerUp={(event) => {
                        if (pointerRef.current?.id === event.pointerId) {
                          commit();
                          if (event.currentTarget.hasPointerCapture(event.pointerId))
                            event.currentTarget.releasePointerCapture(event.pointerId);
                        }
                      }}
                      onPointerCancel={cancel}
                      onLostPointerCapture={() => {
                        if (pointerRef.current) cancel();
                      }}
                    />
                  </Fragment>
                );
              })}
              {drag?.columnId === column.id && drag.index === visibleIndex && marker}
            </ExKanbanColumnView>
          );
        })}
      </div>
    </div>
  );
}
