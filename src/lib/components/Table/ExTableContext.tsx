"use client";

import { createContext } from "react";
import type { ExTableContextValue } from "./props/ExTableProps";

export const ExTableContext = createContext<ExTableContextValue>({
  variant: "default",
  expandMode: "multiple",
  expandedRows: new Set(),
  toggleRow: () => {},
});

ExTableContext.displayName = "ExTableContext";
