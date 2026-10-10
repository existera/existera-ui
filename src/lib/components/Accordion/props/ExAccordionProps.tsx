import type { ReactNode } from "react";
import type {
  ExAccordionSize,
  ExAccordionVariant,
} from "../types/ExAccordionType";

export interface ExAccordionProps {
  defaultOpenIndex?: number | number[] | null;
  allowMultiple?: boolean;
  size?: ExAccordionSize;
  variant?: ExAccordionVariant;
  divider?: boolean;
  children?: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}
