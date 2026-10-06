import type { ReactElement } from "react";
import type { Size } from "../../../types/Types";
import type ExTableCell from "../ExTableCell";
import type ExTableExpand from "../ExTableExpand";
import type ExTableHeader from "../ExTableHeader";

export type TableSize = Size;
export type TableElement =
  | ReactElement<React.ComponentProps<typeof ExTableCell>>
  | ReactElement<React.ComponentProps<typeof ExTableHeader>>;

export type TableExpandElement = ReactElement<
  React.ComponentProps<typeof ExTableExpand>
>;
