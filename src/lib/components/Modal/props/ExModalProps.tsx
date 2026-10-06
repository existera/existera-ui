import type { ReactNode } from "react";
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
}