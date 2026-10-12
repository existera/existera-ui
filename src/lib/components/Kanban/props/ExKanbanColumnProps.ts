import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ExKanbanColumn, ExKanbanSize } from "../types/ExKanbanType";

export interface ExKanbanColumnProps extends ComponentPropsWithoutRef<"section"> {
  column?: ExKanbanColumn;
  header?: ReactNode;
  disabled?: boolean;
  size?: ExKanbanSize;
  active?: boolean;
  readOnly?: boolean;
}
