export const sizeInputRangeStyles = {
  sm: {
    wrapperHoriz: "w-full flex-col",
    wrapperVert: "h-32 w-6 flex-col items-center",
    trackHoriz: "h-1.5 w-full",
    trackVert: "h-full w-1.5",
    thumb: "h-4 w-4 text-[10px]",
    marker: "h-1.5 w-1.5",
    labelHoriz: "h-4 mt-1.5 text-[10px]",
    labelVert: "inset-y-0 -right-4 w-8 text-[10px]",
  },
  md: {
    wrapperHoriz: "w-full flex-col",
    wrapperVert: "h-36 w-8 flex-col items-center",
    trackHoriz: "h-2 w-full",
    trackVert: "h-full w-2",
    thumb: "h-5 w-5 text-[11px]",
    marker: "h-2 w-2",
    labelHoriz: "h-4 mt-2 text-[11px]",
    labelVert: "inset-y-0 -right-6 w-8 text-[11px]",
  },
  lg: {
    wrapperHoriz: "w-full flex-col",
    wrapperVert: "h-40 w-10 flex-col items-center",
    trackHoriz: "h-2.5 w-full",
    trackVert: "h-full w-2.5",
    thumb: "h-6 w-6 text-xs",
    marker: "h-2.5 w-2.5",
    labelHoriz: "h-4 mt-2.5 text-xs",
    labelVert: "inset-y-0 -right-8 w-10 text-xs",
  },
};

export const colorInputRangeStyles = {
  primary: {
    fill: "bg-[var(--color-primary)]",
    text: "text-[var(--color-primary)]",
    ring: "focus-visible:ring-[var(--color-primary)]",
  },
  secondary: {
    fill: "bg-[var(--color-secondary)]",
    text: "text-[var(--color-secondary)]",
    ring: "focus-visible:ring-[var(--color-secondary)]",
  },
  success: {
    fill: "bg-[var(--color-success)]",
    text: "text-[var(--color-success)]",
    ring: "focus-visible:ring-[var(--color-success)]",
  },
  warning: {
    fill: "bg-[var(--color-warning)]",
    text: "text-[var(--color-warning)]",
    ring: "focus-visible:ring-[var(--color-warning)]",
  },
  danger: {
    fill: "bg-[var(--color-danger)]",
    text: "text-[var(--color-danger)]",
    ring: "focus-visible:ring-[var(--color-danger)]",
  },
};
