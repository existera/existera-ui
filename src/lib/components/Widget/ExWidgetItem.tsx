import { memo, useMemo } from "react";
import type { ReactNode } from "react";
import { ExWidgetContext } from "./ExWidgetContext";
import ExWidgetFrame from "./ExWidgetFrame";
import type { ExWidgetLayoutItem } from "./types/ExWidgetType";
import type { GridMetrics } from "./utils/gridGeometry";
import type { useWidgetInteraction, WidgetInteraction } from "./hooks/useWidgetInteraction";

type Controls = ReturnType<typeof useWidgetInteraction>;

function ExWidgetItem({
  item,
  metrics,
  interaction,
  editable,
  instructionsId,
  start,
  move,
  finish,
  keyboard,
  settled,
  children,
}: {
  item: ExWidgetLayoutItem;
  metrics: GridMetrics;
  interaction: WidgetInteraction | null;
  editable: boolean;
  instructionsId: string;
  children: ReactNode;
} & Pick<Controls, "start" | "move" | "finish" | "keyboard" | "settled">) {
  const id = item.id;
  const active = Boolean(interaction);

  const context = useMemo(
    () => ({
      editable,
      active,
      instructionsId,
      start: (event: Parameters<Controls["start"]>[0], action: Parameters<Controls["start"]>[2]) => start(event, id, action),
      move,
      finish,
      keyboard: (event: Parameters<Controls["keyboard"]>[0], action: Parameters<Controls["keyboard"]>[2]) => keyboard(event, id, action),
    }),
    [editable, active, instructionsId, id, start, move, finish, keyboard],
  );
  
  return (
    <ExWidgetContext.Provider value={context}>
      <ExWidgetFrame item={item} metrics={metrics} interaction={interaction} onSettled={settled}>
        {children}
      </ExWidgetFrame>
    </ExWidgetContext.Provider>
  );
}

export default memo(ExWidgetItem);
