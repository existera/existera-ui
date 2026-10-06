import type Prefix from "../../Prefix/ExPrefix";
import type Suffix from "../../Suffix/ExSuffix";
import type { Radius, Size, State } from "../../../types/Types";
import type { ExSelectProps } from "../props/ExSelectProps";

export type SelectSize = Size;
export type SelectRadius = Radius;
export type SelectState = State;

export type CompoundSelect = React.FC<ExSelectProps> & {
  Prefix: typeof Prefix;
  Suffix: typeof Suffix;
};
