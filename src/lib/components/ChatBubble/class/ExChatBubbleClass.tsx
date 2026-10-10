export const ChatBubbleSizeClass = {
  xs: {
    avatar: "size-6",
    bubble: "px-2 py-1.5 rounded-xl",
    text: "text-xs leading-5",
    name: "text-[10px]",
    meta: "text-[9px]",
    icon: 10,
  },
  sm: {
    avatar: "size-7",
    bubble: "px-3 py-2 rounded-2xl",
    text: "text-sm leading-5",
    name: "text-xs",
    meta: "text-[10px]",
    icon: 11,
  },
  md: {
    avatar: "size-8",
    bubble: "px-3.5 py-2 rounded-2xl",
    text: "text-sm leading-6",
    name: "text-xs",
    meta: "text-[10px]",
    icon: 12,
  },
  lg: {
    avatar: "size-10",
    bubble: "px-4 py-3 rounded-3xl",
    text: "text-base leading-7",
    name: "text-sm",
    meta: "text-xs",
    icon: 14,
  },
} as const;
