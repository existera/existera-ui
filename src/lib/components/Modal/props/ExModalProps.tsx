import type { ReactNode, RefObject } from "react";
import type { ModalSize, ModalVariant } from "../types/ExModalType";

export interface ExModalProps {
  variant?: ModalVariant;
  size?: ModalSize;
  isOpen?: boolean;
  closeButton?: boolean;
  closeByOverlay?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  titleId?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  /** Dialog id. titleId instead references the visible heading's id. */
  id?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
}
