import { useEffect, useRef, useState } from "react";

export function useWidgetMetrics() {
  const root = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number | null>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize((previous) => previous !== null && Math.abs(previous - entry.contentRect.width) < 0.1 ? previous : entry.contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { root, size };
}
