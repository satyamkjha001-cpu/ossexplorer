import Link from "next/link";

import { cn } from "@/lib/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton =
  ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink =
  ButtonBaseProps &
  Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "className"
  > & {
    href: string;
  };

export type ButtonProps =
  | ButtonAsButton
  | ButtonAsLink;

const variantStyles: Record<
  ButtonVariant,
  string
> = {
  primary: `
    bg-gray-900
    text-white

    hover:bg-gray-700

    focus:ring-gray-900

    dark:bg-gray-700
    dark:text-white
    dark:hover:bg-gray-600

    dark:focus:ring-gray-400
    dark:focus:ring-offset-gray-950
  `,

  secondary: `
    border
    border-gray-300
    bg-white
    text-gray-700

    hover:bg-gray-100

    focus:ring-gray-900

    dark:border-gray-700
    dark:bg-gray-900
    dark:text-gray-200

    dark:hover:bg-gray-800

    dark:focus:ring-gray-300
    dark:focus:ring-offset-gray-900
  `,

  outline: `
    border
    border-gray-300
    bg-transparent
    text-gray-700

    hover:bg-gray-50

    focus:ring-gray-900

    dark:border-gray-700
    dark:bg-transparent
    dark:text-gray-200

    dark:hover:bg-gray-800

    dark:focus:ring-gray-300
    dark:focus:ring-offset-gray-900
  `,

  ghost: `
    bg-transparent
    text-gray-600

    hover:bg-gray-100
    hover:text-gray-900

    focus:ring-gray-900

    dark:bg-transparent
    dark:text-gray-300

    dark:hover:bg-gray-800
    dark:hover:text-white

    dark:focus:ring-gray-400
    dark:focus:ring-offset-gray-950
  `,
};

const sizeStyles: Record<
  ButtonSize,
  string
> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm font-semibold",
};

const baseStyles = `
  inline-flex
  items-center
  justify-center

  rounded-lg
  font-medium

  transition-all
  duration-150

  focus:outline-none
  focus:ring-2
  focus:ring-offset-2

  disabled:pointer-events-none
  disabled:opacity-50
`;

function isExternalHref(
  href: string
): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://")
  );
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  if ("href" in props && props.href) {
    const {
      href,
      ...linkProps
    } = props;

    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          className={classes}
          {...linkProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const buttonProps =
    props as ButtonAsButton;

  return (
    <button
      type="button"
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  );
}