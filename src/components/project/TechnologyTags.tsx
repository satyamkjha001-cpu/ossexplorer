import Badge from "@/components/ui/Badge";
import HighlightText from "@/components/ui/HighlightText";
import { cn } from "@/lib/cn";

type TechnologyTagsProps = {
  technologies: string[];
  searchQuery?: string;
  size?: "sm" | "md";
  maxVisible?: number;
  className?: string;
};

export default function TechnologyTags({
  technologies,
  searchQuery,
  size = "sm",
  maxVisible,
  className,
}: TechnologyTagsProps) {
  const limit = maxVisible ?? technologies.length;
  const visible = technologies.slice(0, limit);
  const overflow = technologies.length - visible.length;

  return (
    <div
      className={cn(
        "flex min-h-[2.25rem] flex-wrap content-start gap-1.5",
        className
      )}
    >
      {visible.map((technology) => (
        <span key={technology} title={technology} className="max-w-full">
          <Badge
            variant="default"
            size={size}
            className={cn(
              "block truncate rounded-md",
              size === "md" && "px-3 py-1.5 text-sm"
            )}
          >
            <HighlightText text={technology} query={searchQuery} />
          </Badge>
        </span>
      ))}

      {overflow > 0 && (
        <span title={technologies.slice(limit).join(", ")}>
          <Badge variant="default" size={size} className="rounded-md">
            +{overflow}
          </Badge>
        </span>
      )}
    </div>
  );
}
