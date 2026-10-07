import type React from "react";
import type {
  ButtonGroupColor,
  ButtonGroupRadius,
  ButtonGroupSize,
  ButtonGroupVariant,
} from "../types/ExButtonGroupType";

export interface ButtonGroupProps {
  color?: ButtonGroupColor;
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  radius?: ButtonGroupRadius;
  fit?: boolean;
  children?: React.ReactNode;
}
