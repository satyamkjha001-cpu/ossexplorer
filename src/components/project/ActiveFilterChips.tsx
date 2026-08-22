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
  beginnerFriendly?: boolean;
  goodFirstIssue?: boolean;
  minStars?: number;

  activeFilterCount: number;

  onClearSearch: () => void;
  onDomainChange: (value: string) => void;
  onRemoveTechnology: (technology: string) => void;
  onDifficultyChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onBeginnerFriendlyToggle?: () => void;
  onGoodFirstIssueToggle?: () => void;
  onMinStarsChange?: (stars: number | undefined) => void;
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
        transition-all
        hover:opacity-80
        hover:scale-105
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-1
      "
    >
      <Badge
        variant={variant}
        className="gap-1.5 px-3 py-1 shadow-2xs"
      >
        <span>{label}</span>
        <span
          aria-hidden="true"
          className="text-sm font-bold leading-none text-gray-400 hover:text-gray-900 dark:hover:text-white"
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
  beginnerFriendly,
  goodFirstIssue,
  minStars,
  activeFilterCount,
  onClearSearch,
  onDomainChange,
  onRemoveTechnology,
  onDifficultyChange,
  onSortChange,
  onBeginnerFriendlyToggle,
  onGoodFirstIssueToggle,
  onMinStarsChange,
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
      label: `🔍 "${searchQuery.trim()}"`,
      variant: "default",
      onRemove: onClearSearch,
      removeLabel: "Remove search filter",
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
      onRemove: () => onDomainChange("All"),
      removeLabel: `Remove domain filter ${selectedDomain}`,
    });
  }

  /* ========================================
     TECHNOLOGIES
  ======================================== */

  selectedTechnologies.forEach((technology) => {
    chips.push({
      key: `tech-${technology}`,
      label: `Tech: ${technology}`,
      variant: "info",
      onRemove: () => onRemoveTechnology(technology),
      removeLabel: `Remove technology filter ${technology}`,
    });
  });

  /* ========================================
     DIFFICULTY
  ======================================== */

  if (selectedDifficulty !== "All") {
    chips.push({
      key: "difficulty",
      label: `Difficulty: ${selectedDifficulty}`,
      variant: "purple",
      onRemove: () => onDifficultyChange("All"),
      removeLabel: `Remove difficulty filter ${selectedDifficulty}`,
    });
  }

  /* ========================================
     QUICK PRESETS
  ======================================== */

  if (minStars && minStars > 0 && onMinStarsChange) {
    chips.push({
      key: "minStars",
      label: `🌟 >${minStars.toLocaleString()} Stars`,
      variant: "orange",
      onRemove: () => onMinStarsChange(undefined),
      removeLabel: "Remove minimum stars filter",
    });
  }

  if (goodFirstIssue && onGoodFirstIssueToggle) {
    chips.push({
      key: "goodFirstIssue",
      label: "🌱 Good First Issue",
      variant: "info",
      onRemove: onGoodFirstIssueToggle,
      removeLabel: "Remove Good First Issue filter",
    });
  }

  if (beginnerFriendly && onBeginnerFriendlyToggle) {
    chips.push({
      key: "beginnerFriendly",
      label: "🔰 Beginner Friendly",
      variant: "success",
      onRemove: onBeginnerFriendlyToggle,
      removeLabel: "Remove Beginner Friendly filter",
    });
  }

  /* ========================================
     SORT
  ======================================== */

  if (sortOption !== "relevance") {
    chips.push({
      key: "sort",
      label: `Sort: ${SORT_LABELS[sortOption]}`,
      variant: "orange",
      onRemove: () => onSortChange("relevance"),
      removeLabel: "Remove sorting filter",
    });
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-800 motion-safe:animate-fade-in"
      )}
      aria-label={`${activeFilterCount} active filters`}
    >
      {/* ACTIVE LABEL */}
      <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
        Active
        <Badge variant="dark" size="sm" className="min-w-[1.25rem] justify-center">
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
          removeLabel={chip.removeLabel}
        />
      ))}

      {/* CLEAR ALL */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="ml-auto text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/40"
      >
        Clear all filters
      </Button>
    </div>
  );
}