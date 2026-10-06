export interface ExDateRangeCalendarProps {
  open: boolean;
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
  onClear?: () => void;
}
