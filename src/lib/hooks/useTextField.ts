import { useEffect, useRef, useState } from "react";

export function useTextField({
  controlled,
  value = "",
  defaultValue = "",
  onChange,
  onType,
  debounce = 0,
  disabled = false,
  readOnly = false,
}: {
  controlled: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onType?: (value: string) => void;
  debounce?: number;
  disabled?: boolean;
  readOnly?: boolean;
}) {
  const [internal, setInternal] = useState(defaultValue);
  const [draft, setDraft] = useState<{ value: string; base: string } | null>(null);
  const [source, setSource] = useState({ value, disabled, readOnly });
  if (source.value !== value || source.disabled !== disabled || source.readOnly !== readOnly) {
    setSource({ value, disabled, readOnly });
    setDraft(null);
  }
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef<string | null>(null);
  const typeCallback = useRef(onType);
  useEffect(() => {
    typeCallback.current = onType;
  }, [onType]);
  const cancel = () => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
    pending.current = null;
  };
  useEffect(() => cancel, [debounce]);
  useEffect(() => {
    if (controlled && pending.current !== null && value !== pending.current) cancel();
  }, [controlled, value]);
  useEffect(() => {
    if (disabled || readOnly) cancel();
  }, [disabled, readOnly]);
  const change = (next: string, immediate = false) => {
    if (disabled || readOnly) return;
    cancel();
    if (immediate) setDraft(null);
    if (!controlled) setInternal(next);
    else if (!onChange && onType && debounce > 0 && !immediate) setDraft({ value: next, base: value });
    onChange?.(next);
    if (!onType || onType === onChange) return;
    if (debounce <= 0 || immediate) {
      onType(next);
      return;
    }
    pending.current = next;
    timer.current = setTimeout(() => {
      timer.current = null;
      pending.current = null;
      typeCallback.current?.(next);
      setDraft(null);
    }, debounce);
  };
  const reset = () => {
    cancel();
    setDraft(null);
    if (!controlled) setInternal(defaultValue);
    return controlled ? value : defaultValue;
  };
  return {
    value: controlled ? (!onChange && draft?.base === value ? draft.value : value) : internal,
    change,
    reset,
  };
}
