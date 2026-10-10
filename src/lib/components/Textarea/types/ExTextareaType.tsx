import type { Radius, Size, State } from "../../../types/Types";
import type Prefix from "../../Prefix/ExPrefix";
import type Suffix from "../../Suffix/ExSuffix";
import type { ExTextareaProps } from "../props/ExTextareaProps";

export type TextareaSize = Size;
export type TextareaRadius = Radius;
export type TextareaState = State;

export type CompoundTextarea = React.FC<ExTextareaProps> & {
  Prefix: typeof Prefix;
  Suffix: typeof Suffix;
};
