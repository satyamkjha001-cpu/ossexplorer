"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/cn";

type InputSize = "sm" | "md" | "lg";

type InputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    inputSize?: InputSize;
    icon?: React.ReactNode;
    label?: string;
    hideLabel?: boolean;
    wrapperClassName?: string;
  };

const sizeStyles: Record<InputSize, string> = {
  sm: "h-9 text-sm",
  md: "h-10 text-sm",
  lg: "h-12 text-sm",
};

const inputBase = `
  w-full
  rounded-xl
  border
  border-gray-300
  bg-gray-50
  text-gray-900
  outline-none
  transition-all
  duration-150

  placeholder:text-gray-400

  focus:border-gray-900
  focus:ring-2
  focus:ring-gray-900/10

  dark:border-gray-700
  dark:bg-gray-950
  dark:text-gray-100
  dark:placeholder:text-gray-500

  dark:focus:border-gray-500
  dark:focus:bg-gray-950
  dark:focus:ring-gray-400/20
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      inputSize = "md",
      icon,
      label,
      hideLabel = false,
      className,
      wrapperClassName,
      id,
      ...props
    },
    ref
  ) {
    const inputId =
      id ??
      (label
        ? label
            .toLowerCase()
            .replace(/\s+/g, "-")
        : undefined);

    return (
      <div className={wrapperClassName}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              `
                mb-1.5
                block
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-gray-500

                dark:text-gray-400
              `,
              hideLabel && "sr-only"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <span
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400

                dark:text-gray-500
              "
              aria-hidden="true"
            >
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputBase,
              sizeStyles[inputSize],

              icon
                ? "pl-11 pr-4"
                : "px-3",

              (inputSize === "sm" ||
                inputSize === "md") &&
                "rounded-lg",

              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

type SelectProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    hideLabel?: boolean;
    wrapperClassName?: string;
  };

const selectBase = `
  h-10
  w-full
  rounded-lg
  border
  border-gray-300
  bg-gray-50
  px-3
  text-sm
  text-gray-800
  outline-none
  transition-all
  duration-150

  hover:border-gray-400

  focus:border-gray-900
  focus:ring-2
  focus:ring-gray-900/10

  dark:border-gray-700
  dark:bg-gray-950
  dark:text-gray-100

  dark:hover:border-gray-600
  dark:hover:bg-gray-900

  dark:focus:border-gray-500
  dark:focus:bg-gray-950
  dark:focus:ring-gray-400/20
`;

export function Select({
  label,
  hideLabel = false,
  className,
  wrapperClassName,
  id,
  children,
  ...props
}: SelectProps) {
  const selectId =
    id ??
    (label
      ? label
          .toLowerCase()
          .replace(/\s+/g, "-")
      : undefined);

  return (
    <div className={wrapperClassName}>
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            `
              mb-1.5
              block
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-gray-500

              dark:text-gray-400
            `,
            hideLabel && "sr-only"
          )}
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={cn(
          selectBase,
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}