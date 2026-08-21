import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type EmptyStateAction = {
  label: string;
  onClick?: () => void;
  href?: string;
};

type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: EmptyStateAction;
  className?: string;
};

export default function EmptyState({
  icon = "🔍",
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        `
          rounded-2xl border border-dashed border-gray-300 bg-white
          px-6 py-16 text-center
          dark:border-gray-800 dark:bg-gray-900
        `,
        className
      )}
    >
      <div
        className="
          mx-auto flex h-12 w-12 items-center justify-center
          rounded-full bg-gray-100 dark:bg-gray-800
        "
        aria-hidden="true"
      >
        <span className="text-xl text-gray-500 dark:text-gray-400">
          {icon}
        </span>
      </div>

      <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>

      {action &&
        (action.href ? (
          <Button href={action.href} className="mt-5">
            {action.label}
          </Button>
        ) : (
          <Button onClick={action.onClick} className="mt-5">
            {action.label}
          </Button>
        ))}
    </div>
  );
}
