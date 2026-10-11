import type { ExKanbanColumn, ExKanbanMove } from "../types/ExKanbanType";

/** Move without mutating the caller's data. Index is measured after removing the card. */
export function moveKanbanCard(columns: ExKanbanColumn[], cardId: string, toColumnId: string, index: number): { columns: ExKanbanColumn[]; move: ExKanbanMove } | null {
  const source = columns.find(column => column.cards.some(card => card.id === cardId));
  const destination = columns.find(column => column.id === toColumnId);
  if (!source || !destination || source.disabled || destination.disabled || !Number.isFinite(index)) return null;
  const fromIndex = source.cards.findIndex(card => card.id === cardId);
  const card = source.cards[fromIndex];
  if (card.disabled) return null;
  const count = destination.cards.length - (source.id === destination.id ? 1 : 0);
  const toIndex = Math.max(0, Math.min(Math.trunc(index), count));
  if (source.id === destination.id && fromIndex === toIndex) return null;
  const next = columns.map(column => {
    if (column.id !== source.id && column.id !== destination.id) return column;
    const cards = column.cards.filter(item => item.id !== cardId);
    if (column.id === destination.id) cards.splice(toIndex, 0, card);
    return { ...column, cards };
  });
  return { columns: next, move: { card, fromColumnId: source.id, toColumnId: destination.id, fromIndex, toIndex } };
}
