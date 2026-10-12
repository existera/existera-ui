import { Children, Fragment, isValidElement } from "react";
import type { ReactNode } from "react";
import ExKanbanCard from "../ExKanbanCard";
import ExKanbanColumn from "../ExKanbanColumn";
import type { ExKanbanCardProps } from "../props/ExKanbanCardProps";
import type { ExKanbanColumnProps } from "../props/ExKanbanColumnProps";
import type { ExKanbanColumn as ColumnData } from "../types/ExKanbanType";

function flatten(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap(child => isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment ? flatten(child.props.children) : [child]);
}
export function parseKanbanChildren(children: ReactNode) {
  const columnProps = new Map<string, ExKanbanColumnProps>();
  const cardProps = new Map<string, ExKanbanCardProps>();
  const columns: ColumnData[] = [];
  for (const node of flatten(children)) {
    if (!isValidElement<ExKanbanColumnProps>(node) || node.type !== ExKanbanColumn) throw new Error("ExKanban children must be ExKanbanColumn elements.");
    const props = node.props;
    const id = props.column?.id ?? props.id;
    if (!id || columnProps.has(id)) throw new Error("Kanban columns require unique, non-empty IDs.");
    columnProps.set(id, props);
    const cards: ColumnData["cards"] = [];
    for (const child of flatten(props.children)) {
      if (!isValidElement<ExKanbanCardProps>(child) || child.type !== ExKanbanCard) throw new Error("ExKanbanColumn children must be ExKanbanCard elements.");
      const p = child.props;
      const cardId = p.card?.id ?? p.id;
      if (!cardId || cardProps.has(cardId)) throw new Error("Kanban cards require globally unique, non-empty IDs.");
      cardProps.set(cardId, p);
      cards.push(p.card ?? { id: cardId, title: p.title ?? p["aria-label"] ?? cardId, disabled: p.disabled });
    }
    columns.push({ ...props.column, id, title: props.column?.title ?? props.title ?? props["aria-label"] ?? id, disabled: props.disabled ?? props.column?.disabled, cards });
  }
  return { columns, columnProps, cardProps };
}
export function orderKanbanColumns(columns: ColumnData[], order: Array<{ id: string; cards: string[] }> | null): ColumnData[] {
  if (!order) return columns;
  const available = new Map(columns.flatMap(column => column.cards.map(card => [card.id, card] as const)));
  const placed = new Set<string>();
  const next = columns.map(column => ({ ...column, cards: (order.find(item => item.id === column.id)?.cards ?? []).flatMap(id => {
    const card = available.get(id);
    if (!card || placed.has(id)) return [];
    placed.add(id); return [card];
  }) }));
  return next.map(column => ({ ...column, cards: [...column.cards, ...(columns.find(item => item.id === column.id)?.cards ?? []).filter(card => !placed.has(card.id))] }));
}
