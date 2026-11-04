export const ChatBubbleColorClass = {
  primary: { solid: "bg-primary-solid text-white", soft: "bg-primary-soft text-foreground" },
  secondary: { solid: "bg-secondary-solid text-white", soft: "bg-secondary-soft text-foreground" },
  success: { solid: "bg-success-solid text-white", soft: "bg-success-soft text-foreground" },
  warning: { solid: "bg-warning-solid text-white", soft: "bg-warning-soft text-foreground" },
  danger: { solid: "bg-danger-solid text-white", soft: "bg-danger-soft text-foreground" },
} as const;

export const ChatBubbleSizeClass = {
  xs: {
    avatar: "size-6",
    bubble: "px-2 py-1.5",
    text: "text-xs leading-5",
    name: "text-[10px]",
    meta: "text-[9px]",
    icon: 10,
  },
  sm: {
    avatar: "size-7",
    bubble: "px-3 py-2",
    text: "text-sm leading-5",
    name: "text-xs",
    meta: "text-[10px]",
    icon: 11,
  },
  md: {
    avatar: "size-8",
    bubble: "px-3.5 py-2",
    text: "text-sm leading-6",
    name: "text-xs",
    meta: "text-[10px]",
    icon: 12,
  },
  lg: {
    avatar: "size-10",
    bubble: "px-4 py-3",
    text: "text-base leading-7",
    name: "text-sm",
    meta: "text-xs",
    icon: 14,
  },
} as const;
