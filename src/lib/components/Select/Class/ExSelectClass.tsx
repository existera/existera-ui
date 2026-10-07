import type {
  SelectRadius,
  SelectSize,
  SelectState,
} from "../types/ExSelectType";

export const SelectStateClass: Record<SelectState, string> = {
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

export const SelectHeight: Record<SelectSize, string> = {
  xs: "h-[16px]",
  sm: "h-[20px]",
  md: "h-[24px]",
  lg: "h-[28px]",
};

export const SelectSizeClass: Record<
  SelectSize,
  {
    height: string;
    radius: Record<
      SelectRadius,
      {
        prefix: string;
        default: string;
        suffix: string;
      }
    >;
  }
> = {
  xs: {
    height: "min-h-xs h-fit text-xs",
    radius: {
      default: {
        prefix: "rounded-r-xs",
        default: "rounded-xs",
        suffix: "rounded-l-xs",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-full",
        suffix: "rounded-l-full",
      },
    },
  },
  sm: {
    height: "min-h-sm h-fit text-sm",
    radius: {
      default: {
        prefix: "rounded-r-sm",
        default: "rounded-sm",
        suffix: "rounded-l-sm",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-full",
        suffix: "rounded-l-full",
      },
    },
  },
  md: {
    height: "min-h-md h-fit text-md",
    radius: {
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
    },
  },
  lg: {
    height: "min-h-lg h-fit text-lg",
    radius: {
      default: {
        prefix: "rounded-r-lg",
        default: "rounded-lg",
        suffix: "rounded-l-lg",
      },
      full: {
        prefix: "rounded-r-full",
        default: "rounded-full",
        suffix: "rounded-l-full",
      },
    },
  },
};

export const SelectRadiusClass: Record<
  SelectRadius,
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

export const SelectStateIconSize: Record<SelectSize, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4.5",
};

export const SelectPadding: Record<
  SelectSize,
  {
    wrapper: string;
    left: string;
    right: string;
  }
> = {
  xs: {
    wrapper: "px-1.5 py-1",
    left: "pr-0.5",
    right: "pl-0.5",
  },
  sm: {
    wrapper: "px-2 py-1",
    left: "pr-1",
    right: "pl-1",
  },
  md: {
    wrapper: "px-2 py-1",
    left: "pr-1.5",
    right: "pl-1.5",
  },
  lg: {
    wrapper: "px-2.5 py-1",
    left: "pr-2",
    right: "pl-2",
  },
};
