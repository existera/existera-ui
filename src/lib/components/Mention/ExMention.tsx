"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, UserRound } from "lucide-react";
import { cn } from "../../utils/Utils";

import type { ExMentionProps } from "./props/ExMentionProps";
import type { ExMentionUser, MentionTarget, MentionState, PopupPosition } from "./types/ExMentionType";

const POPUP_WIDTH = 280;
const POPUP_HEIGHT = 300;
const POPUP_GAP = 8;
const EMPTY_USERS: ExMentionUser[] = [];

function isMentionInput(target: EventTarget | null): target is MentionTarget {
  if (!(target instanceof HTMLElement)) return false;
  if (target instanceof HTMLTextAreaElement) return !target.readOnly && !target.disabled;
  if (!(target instanceof HTMLInputElement)) return false;

  return ["text", "search"].includes(target.type) && !target.readOnly && !target.disabled;
}

function getMention(element: MentionTarget): MentionState | null {
  const end = element.selectionStart;
  if (end === null || end !== element.selectionEnd) return null;

  const text = element.value.slice(0, end);
  const match = text.match(/(^|[\s([{])@([\w.-]*)$/);

  if (!match) return null;

  return {
    element,
    query: match[2],
    start: end - match[2].length - 1,
    end,
  };
}

function getPosition(element: MentionTarget): PopupPosition {
  const rect = element.getBoundingClientRect();
  const width = Math.min(POPUP_WIDTH, Math.max(200, window.innerWidth - 16));
  const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
  const below = window.innerHeight - rect.bottom;
  const above = rect.top;
  const showAbove = below < POPUP_HEIGHT + POPUP_GAP && above > below;

  return {
    top: showAbove ? Math.max(8, rect.top - Math.min(POPUP_HEIGHT, above - POPUP_GAP) - POPUP_GAP) : rect.bottom + POPUP_GAP,
    left,
    width,
  };
}

export default function ExMention({
  users = EMPTY_USERS,
  onSearch,
  onSelect,
  minQueryLength = 0,
  debounce = 180,
  maxResults = 6,
  className,
}: ExMentionProps) {
  const [mention, setMention] = useState<MentionState | null>(null);
  const [searchResult, setSearchResult] = useState<{
    mention: MentionState;
    users: ExMentionUser[];
    onSearch: ExMentionProps["onSearch"];
    minQueryLength: number;
    debounce: number;
    maxResults: number;
    results: ExMentionUser[];
  } | null>(null);
  const [position, setPosition] = useState<PopupPosition>({ top: 0, left: 0, width: POPUP_WIDTH });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const canSearch = mention !== null && mention.query.length >= minQueryLength;
  const currentResult =
    searchResult?.mention === mention && searchResult?.users === users &&
    searchResult?.onSearch === onSearch && searchResult?.minQueryLength === minQueryLength &&
    searchResult?.debounce === debounce && searchResult?.maxResults === maxResults ? searchResult : null;
  const results = canSearch && currentResult ? currentResult.results : EMPTY_USERS;
  const loading = canSearch && !currentResult;

  const reducedMotion = useReducedMotion();

  const mentionRef = useRef<MentionState | null>(null);
  const resultsRef = useRef<ExMentionUser[]>([]);
  const selectedIndexRef = useRef(0);
  const popupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef(0);
  const selectRef = useRef<(user: ExMentionUser) => void>(() => {});
  const dismissedRef = useRef<{ element: MentionTarget; start: number; end: number; query: string } | null>(null);

  const updateMention = useCallback((next: MentionState | null) => {
    const previous = mentionRef.current;

    if (
      previous?.element === next?.element &&
      previous?.query === next?.query &&
      previous?.start === next?.start &&
      previous?.end === next?.end
    )
      return;

    requestRef.current++;
    resultsRef.current = [];
    mentionRef.current = next;
    setMention(next);
    setSelectedIndex(0);
    selectedIndexRef.current = 0;

    if (next) {
      setPosition(getPosition(next.element));
    } else {
      setSearchResult(null);
    }
  }, []);

  const closeMention = useCallback(() => {
    const current = mentionRef.current;

    if (current) {
      dismissedRef.current = {
        element: current.element,
        start: current.start,
        end: current.end,
        query: current.query,
      };
    }

    updateMention(null);
  }, [updateMention]);

  const detectMention = useCallback(
    (target: EventTarget | null) => {
      if (!isMentionInput(target) || target.closest('[data-mention-ignore="true"]')) {
        updateMention(null);
        return;
      }

      if (document.activeElement !== target) {
        updateMention(null);
        return;
      }

      const next = getMention(target);

      if (!next) {
        dismissedRef.current = null;
        updateMention(null);
        return;
      }

      const dismissed = dismissedRef.current;

      if (
        dismissed &&
        dismissed.element === next.element &&
        dismissed.start === next.start &&
        dismissed.end === next.end &&
        dismissed.query === next.query
      )
        return;

      dismissedRef.current = null;
      updateMention(next);
    },
    [updateMention],
  );

  const selectUser = useCallback(
    (user: ExMentionUser) => {
      const current = mentionRef.current;
      if (!current || !current.element.isConnected) return;

      const element = current.element;
      const replacement = `@${user.username} `;
      const nextValue = element.value.slice(0, current.start) + replacement + element.value.slice(current.end);
      const nextCursor = current.start + replacement.length;

      const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;

      const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;

      closeMention();
      element.focus();

      if (setter) setter.call(element, nextValue);
      else element.value = nextValue;

      element.setSelectionRange(nextCursor, nextCursor);
      element.dispatchEvent(new Event("input", { bubbles: true }));

      dismissedRef.current = null;

      onSelect?.(user, element);
    },
    [onSelect, closeMention],
  );

  useEffect(() => {
    selectRef.current = selectUser;
    resultsRef.current = results;
  }, [selectUser, results]);

  useEffect(() => {
    const handleInput = (event: Event) => {
      detectMention(event.target);
    };

    const handleClick = (event: MouseEvent) => {
      if (popupRef.current?.contains(event.target as Node)) return;

      if (event.target !== mentionRef.current?.element && !isMentionInput(event.target)) {
        closeMention();
        return;
      }

      detectMention(event.target);
    };

    const handleBlur = (event: FocusEvent) => {
      const current = mentionRef.current;
      if (!current || event.target !== current.element) return;

      closeMention();
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (!isMentionInput(event.target)) return;

      const dismissed = dismissedRef.current;

      if (dismissed?.element !== event.target) {
        dismissedRef.current = null;
      }
    };

    const handleSelection = () => {
      const current = mentionRef.current;
      if (!current) return;

      if (document.activeElement !== current.element) {
        closeMention();
        return;
      }

      const next = getMention(current.element);

      if (!next || next.query !== current.query || next.start !== current.start || next.end !== current.end) {
        detectMention(current.element);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const current = mentionRef.current;

      if (!current || event.target !== current.element || event.isComposing) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeMention();
        return;
      }

      if (event.key === "ArrowDown" && resultsRef.current.length) {
        event.preventDefault();
        selectedIndexRef.current = (selectedIndexRef.current + 1) % resultsRef.current.length;
        setSelectedIndex(selectedIndexRef.current);
      }

      if (event.key === "ArrowUp" && resultsRef.current.length) {
        event.preventDefault();
        selectedIndexRef.current = (selectedIndexRef.current - 1 + resultsRef.current.length) % resultsRef.current.length;
        setSelectedIndex(selectedIndexRef.current);
      }

      if (event.key === "Enter" && resultsRef.current.length) {
        event.preventDefault();
        event.stopPropagation();

        const user = resultsRef.current[selectedIndexRef.current];

        if (user) selectRef.current(user);
      }
    };

    const reposition = () => {
      const current = mentionRef.current;

      if (!current) return;

      if (!current.element.isConnected || document.activeElement !== current.element) {
        closeMention();
        return;
      }

      setPosition(getPosition(current.element));
    };

    document.addEventListener("input", handleInput);
    document.addEventListener("click", handleClick);
    document.addEventListener("focusout", handleBlur);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("selectionchange", handleSelection);
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);

    return () => {
      document.removeEventListener("input", handleInput);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("focusout", handleBlur);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("selectionchange", handleSelection);
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [detectMention, closeMention]);

  useEffect(() => {
    if (!mention || mention.query.length < minQueryLength) return;

    const requestId = ++requestRef.current;
    const query = mention.query.toLowerCase();
    let cancelled = false;

    const timer = window.setTimeout(
      async () => {
        let nextResults: ExMentionUser[] = [];
        try {
          const matched = onSearch
            ? await onSearch(query)
            : users.filter((user) => user.username.toLowerCase().includes(query) || user.name.toLowerCase().includes(query));
          nextResults = matched.slice(0, maxResults);
        } catch {
          // A failed search is displayed as an empty result.
        }

        if (cancelled || requestId !== requestRef.current) return;

        resultsRef.current = nextResults;
        setSearchResult({ mention, users, onSearch, minQueryLength, debounce, maxResults, results: nextResults });
        setSelectedIndex(0);
        selectedIndexRef.current = 0;
      },
      onSearch ? debounce : 0,
    );

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [mention, onSearch, users, minQueryLength, debounce, maxResults]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {mention && mention.query.length >= minQueryLength && (
        <motion.div
          ref={popupRef}
          initial={reducedMotion ? false : { opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          style={{ position: "fixed", top: position.top, left: position.left, width: position.width, zIndex: 9999 }}
          className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-lg", className)}>
          <div className="ex-textarea-scroll max-h-64 overflow-y-auto scroll-smooth p-1 motion-reduce:scroll-auto">
            {loading ? (
              <div className="flex items-center justify-center gap-2 px-3 py-4 text-xs text-muted">
                <Search className="size-3.5 animate-pulse" />
                Searching users...
              </div>
            ) : results.length ? (
              results.map((user, index) => (
                <button
                  key={user.id}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectUser(user)}
                  onMouseEnter={() => {
                    selectedIndexRef.current = index;
                    setSelectedIndex(index);
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-150",
                    index === selectedIndex ? "bg-surface-3" : "hover:bg-surface-3",
                  )}>
                  <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-2">
                    {user.avatar ? (
                      <img src={user.avatar} alt="" className="size-full object-cover" />
                    ) : (
                      <UserRound className="size-4 text-muted" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium text-foreground">{user.name}</span>
                    <span className="block truncate text-xs text-muted">@{user.username}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-5 text-center text-xs text-muted">No users found</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
