import Link from "next/link";

import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  linkLabel?: string;
  linkHref?: string;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  linkLabel,
  linkHref = "/projects",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {eyebrow}
        </p>

        <h2
          id={eyebrow.replace(/\s+/g, "-").toLowerCase()}
          className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl"
        >
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {linkLabel && (
        <Link
          href={linkHref}
          className="
            w-fit shrink-0 text-sm font-semibold text-gray-700 transition-colors
            hover:text-gray-950 hover:underline
            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
            dark:text-gray-300 dark:hover:text-white
            dark:focus:ring-white dark:focus:ring-offset-gray-950
          "
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
