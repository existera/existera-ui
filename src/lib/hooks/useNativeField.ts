import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

export function useNativeField<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
  forwardedRef: Ref<T> | undefined,
  reset: (element: T) => void,
) {
  const ref = useRef<T>(null);
  const resetRef = useRef(reset);
  useEffect(() => {
    resetRef.current = reset;
  });
  useImperativeHandle(forwardedRef, () => ref.current!);
  useEffect(() => {
    const element = ref.current;
    const form = element?.form;
    if (!element || !form) return;
    const handleReset = (event: Event) => {
      queueMicrotask(() => {
        if (element.isConnected && element.form === form && !event.defaultPrevented) resetRef.current(element);
      });
    };
    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  });
  return ref;
}
