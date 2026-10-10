"use client";

import { createContext } from "react";
import type {
  ButtonGroupColor,
  ButtonGroupRadius,
  ButtonGroupResponsive,
  ButtonGroupSize,
  ButtonGroupVariant,
} from "./types/ExButtonGroupType";

export interface ExButtonGroupContextValue {
  color: ButtonGroupColor;
  variant: ButtonGroupVariant;
  size: ButtonGroupSize;
  radius: ButtonGroupRadius;
  responsive: ButtonGroupResponsive;
  fit: boolean;
  disabled: boolean;
  value: string | undefined;
  select: (value: string) => void;
}

export const ExButtonGroupContext = createContext<ExButtonGroupContextValue | null>(null);
