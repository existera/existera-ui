"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, UserRound } from "lucide-react";
import { cn } from "../utils/Utils";

export interface ExMentionUser {
  id: string;
  username: string;
  name: string;
  avatar?: string;
}

export interface ExMentionProps {
  users?: ExMentionUser[];
  onSearch?: (query: string) => Promise<ExMentionUser[]> | ExMentionUser[];
  onSelect?: (user: ExMentionUser, element: HTMLInputElement | HTMLTextAreaElement) => void;
  minQueryLength?: number;
  debounce?: number;
  maxResults?: number;
  className?: string;
}

type MentionTarget = HTMLInputElement | HTMLTextAreaElement;

interface MentionState {
  element: MentionTarget;
  query: string;
  start: number;
  end: number;
}

interface PopupPosition {
  top: number;
  left: number;
  width: number;
}

const POPUP_WIDTH = 280;
const POPUP_HEIGHT = 300;
const POPUP_GAP = 8;

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
  users = [],
  onSearch,
  onSelect,
  minQueryLength = 0,
  debounce = 180,
  maxResults = 6,
  className,
}: ExMentionProps) {
  const [mention, setMention] = useState<MentionState | null>(null);
  const [results, setResults] = useState<ExMentionUser[]>([]);
  const [position, setPosition] = useState<PopupPosition>({ top: 0, left: 0, width: POPUP_WIDTH });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const reducedMotion = useReducedMotion();
  const mentionRef = useRef<MentionState | null>(null);
  const resultsRef = useRef<ExMentionUser[]>([]);
  const selectedIndexRef = useRef(0);
  const popupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef(0);
  const selectRef = useRef<(user: ExMentionUser) => void>(() => {});

  const updateMention = useCallback((next: MentionState | null) => {
    mentionRef.current = next;
    setMention(next);
    setSelectedIndex(0);
    selectedIndexRef.current = 0;

    if (next) {
      setPosition(getPosition(next.element));
    } else {
      requestRef.current++;
      setResults([]);
      resultsRef.current = [];
      setLoading(false);
    }
  }, []);

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

      updateMention(null);
      element.focus();

      if (setter) {
        setter.call(element, nextValue);
      } else {
        element.value = nextValue;
      }

      element.setSelectionRange(nextCursor, nextCursor);
      element.dispatchEvent(new Event("input", { bubbles: true }));

      onSelect?.(user, element);
    },
    [onSelect, updateMention],
  );

  selectRef.current = selectUser;
  resultsRef.current = results;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const detect = (target: EventTarget | null) => {
      if (!isMentionInput(target)) {
        updateMention(null);
        return;
      }

      if (target.closest('[data-mention-ignore="true"]')) {
        updateMention(null);
        return;
      }

      const next = getMention(target);

      if (!next) {
        updateMention(null);
        return;
      }

      updateMention(next);
    };

    const handleInput = (event: Event) => detect(event.target);

    const handleClick = (event: MouseEvent) => {
      if (popupRef.current?.contains(event.target as Node)) return;
      detect(event.target);
    };

    const handleSelection = () => {
      const active = document.activeElement;

      if (active && isMentionInput(active) && mentionRef.current?.element === active) {
        const next = getMention(active);

        if (!next) {
          updateMention(null);
        } else if (
          next.query !== mentionRef.current.query ||
          next.start !== mentionRef.current.start ||
          next.end !== mentionRef.current.end
        ) {
          updateMention(next);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const current = mentionRef.current;
      if (!current || event.target !== current.element) return;

      if (event.key === "Escape") {
        event.preventDefault();
        updateMention(null);
        return;
      }

      if (event.key === "ArrowDown") {
        if (!resultsRef.current.length) return;
        event.preventDefault();
        selectedIndexRef.current = (selectedIndexRef.current + 1) % resultsRef.current.length;
        setSelectedIndex(selectedIndexRef.current);
      }

      if (event.key === "ArrowUp") {
        if (!resultsRef.current.length) return;
        event.preventDefault();
        selectedIndexRef.current = (selectedIndexRef.current - 1 + resultsRef.current.length) % resultsRef.current.length;
        setSelectedIndex(selectedIndexRef.current);
      }

      if (event.key === "Enter" && !event.isComposing && resultsRef.current.length) {
        event.preventDefault();
        event.stopPropagation();

        const user = resultsRef.current[selectedIndexRef.current];
        if (user) selectRef.current(user);
      }
    };

    const reposition = () => {
      const current = mentionRef.current;
      if (current?.element.isConnected) setPosition(getPosition(current.element));
    };

    document.addEventListener("input", handleInput);
    document.addEventListener("click", handleClick);
    document.addEventListener("selectionchange", handleSelection);
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);

    return () => {
      document.removeEventListener("input", handleInput);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("selectionchange", handleSelection);
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [updateMention]);

  useEffect(() => {
    if (!mention || mention.query.length < minQueryLength) {
      setResults([]);
      setLoading(false);
      return;
    }

    const requestId = ++requestRef.current;
    const query = mention.query.toLowerCase();
    let cancelled = false;
    setLoading(true);

    const timer = window.setTimeout(async () => {
      try {
        const matched = onSearch
          ? await onSearch(query)
          : users.filter((user) => user.username.toLowerCase().includes(query) || user.name.toLowerCase().includes(query));
        if (cancelled || requestId !== requestRef.current) return;
        setResults(matched.slice(0, maxResults));
        setSelectedIndex(0);
        selectedIndexRef.current = 0;
      } catch {
        if (cancelled || requestId !== requestRef.current) return;
        setResults([]);
      } finally {
        if (!cancelled && requestId === requestRef.current) setLoading(false);
      }
    }, debounce);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [mention?.query, mention?.element, onSearch, users, minQueryLength, debounce, maxResults]);

  if (!mounted) return null;

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
          <div className="max-h-64 overflow-y-auto p-1.5">
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
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-150 cursor-pointer",
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
