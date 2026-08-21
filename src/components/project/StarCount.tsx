import { formatStars } from "@/lib/format";
import { cn } from "@/lib/cn";

type StarCountProps = {
  stars: number;
  className?: string;
  showIcon?: boolean;
};

export default function StarCount({
  stars,
  className,
  showIcon = true,
}: StarCountProps) {
  return (
    <span
      className={cn(
        "text-sm font-medium text-gray-600 dark:text-gray-300",
        className
      )}
      title={`${stars.toLocaleString()} stars`}
    >
      {showIcon && "★ "}
      {formatStars(stars)}
    </span>
  );
}
