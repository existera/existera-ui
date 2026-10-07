import { createContext, useContext } from "react";
import type { ExAccordionSize } from "../types/ExAccordionType";

export type ExAccordionContextType = {
  openIndex: number | null;
  openIndexes: number[];
  allowMultiple: boolean;
  size: ExAccordionSize;
  toggle: (index: number) => void;
};

export const ExAccordionContext = createContext<ExAccordionContextType | null>(
  null,
);

export function useAccordion() {
  const ctx = useContext(ExAccordionContext);
  if (!ctx) {
    throw new Error("ExAccordionItem must be used inside ExAccordion");
  }
  return ctx;
}
