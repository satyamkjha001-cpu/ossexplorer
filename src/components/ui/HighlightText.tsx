import React from "react";

type HighlightTextProps = {
  text: string;
  query?: string;
  className?: string;
  highlightClassName?: string;
};

/**
 * Escapes regex special characters in a search term.
 */
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HighlightText({
  text,
  query = "",
  className = "",
  highlightClassName = "bg-amber-200/80 text-amber-950 dark:bg-amber-500/30 dark:text-amber-200 rounded px-0.5 font-semibold",
}: HighlightTextProps) {
  if (!query || !query.trim() || !text) {
    return <span className={className}>{text}</span>;
  }

  // Split query into distinct non-empty search terms
  const terms = query
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0)
    .map(escapeRegExp);

  if (terms.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Create case-insensitive regex for all terms
  const regex = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isMatch = terms.some(
          (term) => part.toLowerCase() === term.toLowerCase()
        );

        if (isMatch) {
          return (
            <mark key={index} className={highlightClassName}>
              {part}
            </mark>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
