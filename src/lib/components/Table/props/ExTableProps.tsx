import type { ReactNode } from "react";
import type { TableSize } from "../types/ExTableType";

export interface ExTableProps {
  size?: TableSize;
  expandMode?: "single" | "multiple";
  children?: ReactNode;
}

export interface ExTableContextValue {
  expandMode: "single" | "multiple";
  expandedRows: Set<string>;
  toggleRow: (id: string) => void;
}

export interface ExTableExpandProps {
  children?: ReactNode;
}

export interface ExTableRowProps {
  id?: string;
  expandable?: boolean;
  children?: ReactNode;
}
