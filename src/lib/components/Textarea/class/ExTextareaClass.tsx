import type {
  TextareaRadius,
  TextareaSize,
  TextareaState,
} from "../types/ExTextareaType";

export const TextareaStateClass: Record<TextareaState, string> = {
  default:
    "focus-within:outline-2 focus-within:outline-primary " +
    "focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.08),0_0_14px_rgba(59,130,246,0.12)] " +
    "dark:focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.14),0_0_14px_rgba(59,130,246,0.16)]",

  error:
    "outline-2 outline-danger " +
    "focus-within:shadow-[0_0_0_3px_rgba(239,68,68,0.08),0_0_14px_rgba(239,68,68,0.12)] " +
    "dark:focus-within:shadow-[0_0_0_3px_rgba(239,68,68,0.14),0_0_14px_rgba(239,68,68,0.16)]",

  success:
    "outline-2 outline-success " +
    "focus-within:shadow-[0_0_0_3px_rgba(34,197,94,0.08),0_0_14px_rgba(34,197,94,0.12)] " +
    "dark:focus-within:shadow-[0_0_0_3px_rgba(34,197,94,0.14),0_0_14px_rgba(34,197,94,0.16)]",
};

export const TextareaSizeClass: Record<
  TextareaSize,
  {
    height: string;
    radius: Record<
      TextareaRadius,
      {
        prefix: string;
        default: string;
        suffix: string;
      }
    >;
  }
> = {
  xs: {
    height: "min-h-[16px] text-xs",
    radius: {
      default: {
        prefix: "rounded-r-xs",
        default: "rounded-xs",
        suffix: "rounded-l-xs",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-[var(--radius-full-xs)]",
        suffix: "rounded-l-full",
      },
    },
  },
  sm: {
    height: "min-h-[20px] text-sm",
    radius: {
      default: {
        prefix: "rounded-r-sm",
        default: "rounded-sm",
        suffix: "rounded-l-sm",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-[var(--radius-full-sm)]",
        suffix: "rounded-l-full",
      },
    },
  },
  md: {
    height: "min-h-[24px] text-md",
    radius: {
      default: {
        prefix: "rounded-r-md",
        default: "rounded-md",
        suffix: "rounded-l-md",
      },
      full: {
        prefix: "rounded-r-md",
        default: "rounded-[var(--radius-full-md)]",
        suffix: "rounded-l-full",
      },
    },
  },
  lg: {
    height: "min-h-[28px] text-lg",
    radius: {
      default: {
        prefix: "rounded-r-lg",
        default: "rounded-lg",
        suffix: "rounded-l-lg",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-[var(--radius-full-lg)]",
        suffix: "rounded-l-full",
      },
    },
  },
};

export const TextareaRadiusClass: Record<
  TextareaRadius,
  {
    prefix: string;
    default: string;
    suffix: string;
  }
> = {
  default: {
    prefix: "rounded-r-md",
    default: "rounded-md",
    suffix: "rounded-l-md",
  },
  full: {
    prefix: "rounded-r-md",
    default: "rounded-full",
    suffix: "rounded-l-full",
  },
};

export const TextareaStateIconSize: Record<TextareaSize, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4.5",
};
export const TextareaStateIconPaddingSize: Record<TextareaSize, string> = {
  xs: "pt-[2px]",
  sm: "pt-[3.5px]",
  md: "pt-[4.5px]",
  lg: "pt-[5px]",
};

export const TextareaPadding: Record<
  TextareaSize,
  {
    wrapper: string;
    left: string;
    right: string;
  }
> = {
  xs: {
    wrapper: "px-1.5 py-1",
    left: "pr-0.5 pt-[4px]",
    right: "pl-0.5 pt-[4px]",
  },
  sm: {
    wrapper: "px-2 py-1",
    left: "pr-1 pt-[5.5px]",
    right: "pl-1 pt-[5.5px]",
  },
  md: {
    wrapper: "px-2 py-[3px]",
    left: "pr-1.5 pt-[6.5px]",
    right: "pl-1.5 pt-[6.5px]",
  },
  lg: {
    wrapper: "px-2.5 py-1",
    left: "pr-2 pt-[7px]",
    right: "pl-2 pt-[7px]",
  },
};
