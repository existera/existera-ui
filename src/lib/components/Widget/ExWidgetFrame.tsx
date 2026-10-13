import { memo, useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import type { ExWidgetLayoutItem } from "./types/ExWidgetType";
import type { GridMetrics } from "./utils/gridGeometry";
import { widgetBounds } from "./utils/gridGeometry";
import type { WidgetInteraction } from "./hooks/useWidgetInteraction";

const spring = { type: "spring" as const, stiffness: 440, damping: 40, mass: 0.8 };

function ExWidgetFrame({
  item,
  metrics,
  interaction,
  onSettled,
  children,
}: {
  item: ExWidgetLayoutItem;
  metrics: GridMetrics;
  interaction: WidgetInteraction | null;
  onSettled: () => void;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const slot = interaction?.origin ?? item;
  const origin = widgetBounds(slot, metrics);
  const target = interaction?.pixels ?? widgetBounds(item, metrics);
  const animation = useAnimationControls();
  const previous = useRef({ ready: false, active: false, unit: 0 });
  const x = target.x - origin.x;
  const y = target.y - origin.y;
  const width = target.width;
  const height = target.height;
  const phase = interaction?.phase;

  useLayoutEffect(() => {
    if (metrics.unit <= 0) return;
    const next = { x, y, width, height };
    if (
      !previous.current.ready ||
      previous.current.unit !== metrics.unit ||
      (previous.current.active && !phase) ||
      phase === "drag" ||
      reduced
    ) {
      animation.set(next);
      if (phase === "settle") onSettled();
    } else {
      void animation.start({ ...next, transition: spring }).then(() => {
        if (phase === "settle") onSettled();
      });
    }
    previous.current = { ready: true, active: Boolean(phase), unit: metrics.unit };
    return () => animation.stop();
  }, [animation, metrics.unit, x, y, width, height, phase, reduced, onSettled]);
  
  return (
    <motion.div
      data-widget-id={item.id}
      data-row={item.row}
      data-col={item.col}
      data-row-span={item.rowSpan}
      data-col-span={item.colSpan}
      layout={interaction ? false : "position"}
      initial={false}
      animate={animation}
      transition={interaction?.phase === "drag" || reduced ? { duration: 0 } : spring}
      style={{
        position: "relative",
        minWidth: 0,
        minHeight: 0,
        gridColumn: `${slot.col + 1} / span ${slot.colSpan}`,
        gridRow: `${slot.row + 1} / span ${slot.rowSpan}`,
        zIndex: interaction ? 2 : undefined,
        touchAction: "auto",
      }}>
      {children}
    </motion.div>
  );
}

export default memo(ExWidgetFrame);
