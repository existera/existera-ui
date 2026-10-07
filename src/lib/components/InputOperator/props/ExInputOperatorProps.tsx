import type { ReactNode } from "react";

import { InputOperatorRadius, InputOperatorSize, InputOperatorState } from "../types/ExInputOperatorType";

export interface ExInputOperatorProps {
  id?: string;
  size?: InputOperatorSize;
  radius?: InputOperatorRadius;
  disabled?: boolean;
  state?: InputOperatorState;
  children?: ReactNode;
}

export interface OperatorProps {
  children?: ReactNode;
}
