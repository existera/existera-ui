import type { ComponentPropsWithoutRef } from "react";
import type { ExKanbanColumn, ExKanbanSize } from "../types/ExKanbanType";

export interface ExKanbanColumnProps extends ComponentPropsWithoutRef<"section"> {
  column: ExKanbanColumn;
  size?: ExKanbanSize;
  active?: boolean;
  readOnly?: boolean;
}
