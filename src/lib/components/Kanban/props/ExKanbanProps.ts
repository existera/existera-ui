import type { ReactNode } from "react";
import type { ExKanbanCard, ExKanbanColumn, ExKanbanMove, ExKanbanSize } from "../types/ExKanbanType";

export interface ExKanbanProps {
  columns: ExKanbanColumn[];
  onChange?: (columns: ExKanbanColumn[], move: ExKanbanMove) => void;
  onCardClick?: (card: ExKanbanCard, column: ExKanbanColumn) => void;
  renderCard?: (card: ExKanbanCard) => ReactNode;
  size?: ExKanbanSize;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}
