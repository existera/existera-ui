export type ExKanbanSize = "sm" | "md" | "lg";
export type ExKanbanColor = "neutral" | "primary" | "success" | "warning" | "danger";

export interface ExKanbanCard {
  id: string;
  title: string;
  description?: string;
  labels?: string[];
  assignee?: string;
  priority?: "low" | "medium" | "high";
  disabled?: boolean;
}

export interface ExKanbanColumn {
  id: string;
  title: string;
  color?: ExKanbanColor;
  cards: ExKanbanCard[];
  disabled?: boolean;
}

export interface ExKanbanMove {
  card: ExKanbanCard;
  fromColumnId: string;
  toColumnId: string;
  fromIndex: number;
  toIndex: number;
}
