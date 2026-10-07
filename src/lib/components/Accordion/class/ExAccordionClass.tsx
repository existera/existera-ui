import type { ExAccordionSize } from "../types/ExAccordionType";

export const AccordionSizeClass: Record<
  ExAccordionSize,
  {
    pading: string;
    padingContent: string;
    title: string;
    text: string;
  }
> = {
  xs: {
    pading: "px-3 py-2",
    padingContent: "px-3",
    title: "text-xs",
    text: "text-xs",
  },
  sm: {
    pading: "px-3 py-2",
    padingContent: "px-3",
    title: "text-sm",
    text: "text-sm",
  },
  md: {
    pading: "px-3 py-2",
    padingContent: "px-3",
    title: "text-md",
    text: "text-md",
  },
  lg: {
    pading: "px-3 py-2",
    padingContent: "px-3",
    title: "text-lg",
    text: "text-lg",
  },
};
