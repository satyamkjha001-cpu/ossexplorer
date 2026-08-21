import { cn } from "@/lib/cn";

type CardProps = {
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const paddingStyles = {
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-5 sm:p-8",
};

export default function Card({
  hover = false,
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <article
      className={cn(
        `
          flex flex-col rounded-xl border border-gray-200 bg-white
          shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20
        `,
        hover &&
          `
            motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out
            hover:-translate-y-1 hover:shadow-md
            dark:hover:border-gray-700 dark:hover:bg-gray-800
          `,
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
}

type CardSectionProps = {
  className?: string;
  children: React.ReactNode;
};

export function CardFooter({ className, children }: CardSectionProps) {
  return <div className={cn("mt-auto pt-6", className)}>{children}</div>;
}

export function CardDivider({ className, children }: CardSectionProps) {
  return (
    <div
      className={cn(
        "border-t border-gray-100 pt-4 dark:border-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}
