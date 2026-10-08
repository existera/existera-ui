import type { Radius, Size, State } from "../../../types/Types";
import type Prefix from "../../Prefix/ExPrefix";
import type Suffix from "../../Suffix/ExSuffix";
import type { ExDatePickerProps } from "../props/ExDatePickerProps";
import { EX_INPUT_OPERATOR_COMPONENT } from "../../InputOperator/context/ExInputOperatorMarker";

export type DatePickerState = State;
export type DatePickerSize = Size;
export type DatePickerRadius = Radius;

export type CompoundDatePicker = React.FC<ExDatePickerProps> & {
  Prefix: typeof Prefix;
  Suffix: typeof Suffix;
  [EX_INPUT_OPERATOR_COMPONENT]?: boolean;
};

export type ContentStyle = {
  top: number;
  left: number;
  minWidth: number;
  visibility: "hidden" | "visible";
};
