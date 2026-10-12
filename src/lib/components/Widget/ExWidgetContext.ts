import { createContext } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import type { ExWidgetAction } from "./types/ExWidgetType";

export const ExWidgetContext = createContext<{
  editable: boolean;
  active: boolean;
  instructionsId: string;
  start: (event: PointerEvent<HTMLButtonElement>, action: ExWidgetAction) => void;
  move: (event: PointerEvent<HTMLButtonElement>) => void;
  finish: (event: PointerEvent<HTMLButtonElement>, cancel?: boolean) => void;
  keyboard: (event: KeyboardEvent<HTMLButtonElement>, action: ExWidgetAction) => void;
} | null>(null);
