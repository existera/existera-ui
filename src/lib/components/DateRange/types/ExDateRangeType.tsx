import type { Radius, Size, State } from "../../../types/Types";
import type Prefix from "../../Prefix/ExPrefix";
import type Suffix from "../../Suffix/ExSuffix";
import type { ExDateRangeProps } from "../props/ExDateRangeProps";

export type DateRangeState = State;
export type DateRangeSize = Size;
export type DateRangeRadius = Radius;

export type CompoundDateRange = React.FC<ExDateRangeProps> & {
  Prefix: typeof Prefix;
  Suffix: typeof Suffix;
};

export type ContentStyle = {
  top: number;
  left: number;
  minWidth: number;
  visibility: "hidden" | "visible";
};
