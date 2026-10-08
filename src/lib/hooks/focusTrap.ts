interface Trap { container: HTMLElement; focus: () => void }
const documents = new WeakMap<Document, { traps: Trap[]; overflow: string }>();
const selector = 'button,input:not([type="hidden"]),select,textarea,a[href],[tabindex],[contenteditable="true"],video[controls],audio[controls],iframe';

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const view = container.ownerDocument.defaultView;
  return Array.from(container.querySelectorAll<HTMLElement>(selector))
    .filter(element => element.tabIndex >= 0 && !element.matches(":disabled") &&
      !element.closest('[hidden],[inert],[aria-hidden="true"]') &&
      element.getClientRects().length > 0 && view?.getComputedStyle(element).visibility !== "hidden")
    .filter((element, _, elements) => {
      if (element.tagName !== "INPUT") return true;
      const radio = element as HTMLInputElement;
      if (radio.type !== "radio" || !radio.name) return true;
      const group = elements.filter(item => item.tagName === "INPUT" &&
        (item as HTMLInputElement).type === "radio" && (item as HTMLInputElement).name === radio.name &&
        (item as HTMLInputElement).form === radio.form) as HTMLInputElement[];
      return element === (group.find(item => item.checked) ?? group[0]);
    })
    .sort((a, b) => (a.tabIndex || Infinity) - (b.tabIndex || Infinity));
}

export function activateFocusTrap(container: HTMLElement, options: {
  initialFocus?: HTMLElement | null;
  returnFocus?: HTMLElement | null;
  onEscape?: () => void;
} = {}): () => void {
  const document = container.ownerDocument;
  const previous = options.returnFocus ?? document.activeElement as HTMLElement | null;
  let state = documents.get(document);
  if (!state) {
    state = { traps: [], overflow: document.documentElement.style.overflow };
    documents.set(document, state);
    document.documentElement.style.overflow = "hidden";
  }
  container.inert = false;
  container.removeAttribute("aria-hidden");
  let lastFocused: HTMLElement | null = null;
  const focus = () => {
    const elements = getFocusableElements(container);
    const target = lastFocused && elements.includes(lastFocused) ? lastFocused : elements[0] ?? container;
    target.focus({ preventScroll: true });
  };
  const trap: Trap = { container, focus };
  state.traps.push(trap);
  const isTop = () => state.traps.at(-1) === trap;
  const onKeyDown = (event: KeyboardEvent) => {
    if (!isTop() || event.defaultPrevented || event.isComposing) return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      options.onEscape?.();
    } else if (event.key === "Tab") {
      const elements = getFocusableElements(container);
      event.preventDefault();
      if (!elements.length) { container.focus({ preventScroll: true }); return; }
      const index = elements.indexOf(document.activeElement as HTMLElement);
      const next = index < 0 ? (event.shiftKey ? elements.length - 1 : 0)
        : (index + (event.shiftKey ? -1 : 1) + elements.length) % elements.length;
      elements[next].focus({ preventScroll: true });
    }
  };
  const onFocus = () => {
    if (!isTop()) return;
    if (container.contains(document.activeElement)) lastFocused = document.activeElement as HTMLElement;
    else focus();
  };
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("focusin", onFocus);
  if (options.initialFocus && container.contains(options.initialFocus) &&
    !options.initialFocus.matches(":disabled") && options.initialFocus.getClientRects().length) {
    options.initialFocus.focus({ preventScroll: true });
  } else focus();

  let disposed = false;
  return () => {
    if (disposed) return;
    disposed = true;
    const wasTop = isTop();
    state.traps.splice(state.traps.indexOf(trap), 1);
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("focusin", onFocus);
    // Exit animations can retain this DOM after the modal has closed.
    container.inert = true;
    container.setAttribute("aria-hidden", "true");
    const remaining = state.traps.at(-1);
    if (!remaining) {
      document.documentElement.style.overflow = state.overflow;
      documents.delete(document);
    }
    if (wasTop) {
      if (previous?.isConnected && !previous.matches(":disabled") &&
        !previous.closest('[hidden],[inert]') && (!remaining || remaining.container.contains(previous))) {
        previous.focus({ preventScroll: true });
      } else remaining?.focus();
    }
  };
}
