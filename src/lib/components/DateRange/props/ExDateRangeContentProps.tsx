export interface ExDateRangeCalendarProps {
  open: boolean;
  popupId?: string;
  onPopupKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  startDateValue?: string;
  endDateValue?: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  format?: "DD-MM-YYYY" | "YYYY-MM-DD";
  disabledDate?: string[];
  startDate?: string;
  endDate?: string;
  onSelectStart?: (date: string) => void;
  onSelectEnd?: (date: string) => void;
  onSelectRange?: (range: { startDate: string; endDate: string }) => void;
  onClear?: () => void;
}
