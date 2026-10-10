import type { ReactNode } from "react";

import type { ToggleRadius, ToggleSize } from "../types/ExToggleType";

export interface ExToggleProps {
  size?: ToggleSize;
  loading?: boolean;
  fit?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
  radius?: ToggleRadius;
  selected?: boolean;
  onSelect?: (value: boolean, id?: string) => void;
  id?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  showCheckIcon?: boolean;
}