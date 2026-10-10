import type React from "react";

export interface ExComboBoxContentProps {
  children: React.ReactNode;
  open: boolean;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}
