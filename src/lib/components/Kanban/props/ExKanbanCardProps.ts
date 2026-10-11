import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ExKanbanCard, ExKanbanSize } from "../types/ExKanbanType";

export interface ExKanbanCardProps extends Omit<ComponentPropsWithoutRef<"article">, "children"> {
  card: ExKanbanCard;
  size?: ExKanbanSize;
  moving?: boolean;
  locked?: boolean;
  renderCard?: (card: ExKanbanCard) => ReactNode;
  onCardClick?: (card: ExKanbanCard) => void;
}
