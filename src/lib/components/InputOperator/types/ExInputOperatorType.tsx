import type { FC } from "react";

import type { Radius, Size, State } from "../../../types/Types";

import type Prefix from "../../Prefix/ExPrefix";
import type Suffix from "../../Suffix/ExSuffix";

import type { ExInputOperatorProps, OperatorProps } from "../props/ExInputOperatorProps";

export type InputOperatorSize = Size;
export type InputOperatorRadius = Radius;
export type InputOperatorState = State;

export type CompoundInputOperator = FC<ExInputOperatorProps> & {
  Prefix: typeof Prefix;
  Suffix: typeof Suffix;
  Operator: FC<OperatorProps>;
};
