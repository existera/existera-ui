import type { ReactNode } from "react";

export interface ExTreeViewItemData {
  id: string;
  name: string | null;
  icon: string | null;
}

export interface ExTreeViewItemProps {
  id?: string;
  name?: string;
  icon?: string;
  total?: number;
  children?: ReactNode;
  onClick?: (item: ExTreeViewItemData) => void;
  onEdit?: (item: ExTreeViewItemData) => void;
  onMove?: (item: ExTreeViewItemData) => void;
  onDelete?: (item: ExTreeViewItemData) => void;
  "aria-label"?: string;
}
