export interface ExDatePickerCalendarProps {
  open: boolean;
  value?: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  format?: "DD-MM-YYYY" | "YYYY-MM-DD";
  disabledDate?: string[];
  startDate?: string;
  endDate?: string;
  onSelect?: (date: string) => void;
  onClear?: () => void;
}
