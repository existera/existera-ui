import type { Radius, Size, State } from "../../../types/Types";
import type Prefix from "../../Prefix/ExPrefix";
import type Suffix from "../../Suffix/ExSuffix";
import type { ExInputProps } from "../props/ExInputProps";

export type InputSize = Size;
export type InputRadius = Radius;
export type InputState = State;
export type ExInputType = "text" | "email" | "password" | "number" | "search" | "tel" | "url";

export type CompoundInput = React.FC<ExInputProps> & {
  Prefix: typeof Prefix;
  Suffix: typeof Suffix;
};
