import { useCallback, useLayoutEffect, useRef } from "react";

/** Stable event identity with the latest committed props. */
export function useWidgetCallback<Args extends unknown[], Result>(callback: (...args: Args) => Result) {
  const latest = useRef(callback);
  useLayoutEffect(() => { latest.current = callback; });
  return useCallback((...args: Args) => latest.current(...args), []);
}
