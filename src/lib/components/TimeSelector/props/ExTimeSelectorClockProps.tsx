export interface ExTimeSelectorClockProps {
  children: React.ReactNode;
  open: boolean;
  popupId?: string;
  onPopupKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}
