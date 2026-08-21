import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

import type { Project } from "@/data/projects";

type DifficultyBadgeProps = {
  difficulty: Project["difficulty"];
  size?: "sm" | "md";
  className?: string;
};

const difficultyStyles: Record<Project["difficulty"], string> = {
  Beginner:
    "border border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/70 dark:text-green-300",
  Intermediate:
    "border border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/70 dark:text-amber-300",
  Advanced:
    "border border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/70 dark:text-red-300",
};

export default function DifficultyBadge({
  difficulty,
  size = "md",
  className,
}: DifficultyBadgeProps) {
  return (
    <Badge
      variant="default"
      size={size}
      className={cn(
        "shrink-0 rounded-full font-semibold",
        difficultyStyles[difficulty],
        size === "md" && "px-3 py-1 text-sm",
        className
      )}
    >
      {difficulty}
    </Badge>
  );
}
