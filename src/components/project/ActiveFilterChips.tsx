"use client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

import {
  SORT_LABELS,
  type SortOption,
} from "@/lib/projectFilters";

import { cn } from "@/lib/cn";

type ActiveFilterChipsProps = {
  searchQuery: string;
  selectedDomain: string;
  selectedTechnologies: string[];
  selectedDifficulty: string;
  sortOption: SortOption;

  activeFilterCount: number;

  onClearSearch: () => void;
  onDomainChange: (value: string) => void;
  onRemoveTechnology: (
    technology: string
  ) => void;
  onDifficultyChange: (
    value: string
  ) => void;
  onSortChange: (
    value: SortOption
  ) => void;
  onClearAll: () => void;
};

type ChipConfig = {
  key: string;
  label: string;
  variant:
    | "default"
    | "info"
    | "purple"
    | "success"
    | "orange";
  onRemove: () => void;
  removeLabel: string;
};

function FilterChip({
  label,
  variant,
  onRemove,
  removeLabel,
}: Omit<ChipConfig, "key">) {
  return (
    <button
      type="button"
      onClick={onRemove}
      aria-label={removeLabel}
      className="
        inline-flex
        min-h-8
        items-center
        rounded-full
        outline-none
        transition-opacity
        hover:opacity-80

        focus:ring-2
        focus:ring-gray-900
        focus:ring-offset-1

        dark:focus:ring-gray-400
      "
    >
      <Badge
        variant={variant}
        className="gap-1.5"
      >
        {label}

        <span
          aria-hidden="true"
          className="text-sm leading-none"
        >
          ×
        </span>
      </Badge>
    </button>
  );
}

export default function ActiveFilterChips({
  searchQuery,
  selectedDomain,
  selectedTechnologies,
  selectedDifficulty,
  sortOption,
  activeFilterCount,
  onClearSearch,
  onDomainChange,
  onRemoveTechnology,
  onDifficultyChange,
  onSortChange,
  onClearAll,
}: ActiveFilterChipsProps) {
  if (activeFilterCount === 0) {
    return null;
  }

  const chips: ChipConfig[] = [];

  /* ========================================
     SEARCH
  ======================================== */

  if (searchQuery.trim()) {
    chips.push({
      key: "search",
      label: `Search: "${searchQuery.trim()}"`,
      variant: "default",
      onRemove: onClearSearch,
      removeLabel:
        "Remove search filter",
    });
  }

  /* ========================================
     DOMAIN
  ======================================== */

  if (selectedDomain !== "All") {
    chips.push({
      key: "domain",
      label: `Domain: ${selectedDomain}`,
      variant: "default",
      onRemove: () =>
        onDomainChange("All"),
      removeLabel:
        `Remove domain filter ${selectedDomain}`,
    });
  }

  /* ========================================
     TECHNOLOGIES
  ======================================== */

  selectedTechnologies.forEach(
    (technology) => {
      chips.push({
        key: `tech-${technology}`,
        label: `Tech: ${technology}`,
        variant: "info",
        onRemove: () =>
          onRemoveTechnology(
            technology
          ),
        removeLabel:
          `Remove technology filter ${technology}`,
      });
    }
  );

  /* ========================================
     DIFFICULTY
  ======================================== */

  if (
    selectedDifficulty !== "All"
  ) {
    chips.push({
      key: "difficulty",
      label: `Difficulty: ${selectedDifficulty}`,
      variant: "purple",
      onRemove: () =>
        onDifficultyChange("All"),
      removeLabel:
        `Remove difficulty filter ${selectedDifficulty}`,
    });
  }

  /* ========================================
     SORT
  ======================================== */

  if (
    sortOption !== "relevance"
  ) {
    chips.push({
      key: "sort",
      label: `Sort: ${SORT_LABELS[sortOption]}`,
      variant: "orange",
      onRemove: () =>
        onSortChange("relevance"),
      removeLabel:
        "Remove sorting filter",
    });
  }

  return (
    <div
      className={cn(
        `
          flex
          flex-wrap
          items-center
          gap-2
          border-t
          border-gray-100
          pt-3
        `,
        `
          dark:border-gray-800
          motion-safe:animate-fade-in
        `
      )}
      aria-label={`${activeFilterCount} active filters`}
    >
      {/* ACTIVE LABEL */}

      <span
        className="
          mr-1
          inline-flex
          items-center
          gap-1.5
          text-xs
          font-semibold
          text-gray-500

          dark:text-gray-400
        "
      >
        Active

        <Badge
          variant="dark"
          size="sm"
          className="
            min-w-[1.25rem]
            justify-center
          "
        >
          {activeFilterCount}
        </Badge>
      </span>

      {/* FILTER CHIPS */}

      {chips.map((chip) => (
        <FilterChip
          key={chip.key}
          label={chip.label}
          variant={chip.variant}
          onRemove={chip.onRemove}
          removeLabel={
            chip.removeLabel
          }
        />
      ))}

      {/* CLEAR ALL */}

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="
          ml-auto
          text-xs
        "
      >
        Clear all filters
      </Button>
    </div>
  );
}