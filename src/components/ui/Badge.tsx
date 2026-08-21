import { cn } from "@/lib/cn";

export type BadgeVariant =
  | "default"
  | "success"
  | "info"
  | "warning"
  | "purple"
  | "orange"
  | "dark";

type BadgeProps = {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: `
    bg-gray-100 text-gray-700
    dark:bg-gray-800 dark:text-gray-200
  `,
  success: `
    bg-green-50 text-green-700
    dark:bg-green-950/60 dark:text-green-400
  `,
  info: `
    bg-blue-50 text-blue-700
    dark:bg-blue-950/60 dark:text-blue-400
  `,
  warning: `
    bg-yellow-50 text-yellow-800
    dark:bg-yellow-950/60 dark:text-yellow-400
  `,
  purple: `
    bg-purple-50 text-purple-700
    dark:bg-purple-950/60 dark:text-purple-300
  `,
  orange: `
    bg-orange-50 text-orange-700
    dark:bg-orange-950/60 dark:text-orange-300
  `,
  dark: `
    bg-gray-900 text-white
    dark:bg-white dark:text-gray-900
  `,
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

export default function Badge({
  variant = "default",
  size = "md",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
