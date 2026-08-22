"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import SearchBar from "@/components/project/SearchBar";
import {
  DIFFICULTIES,
  SORT_LABELS,
  type SortOption,
  type TechnologyMatchMode,
} from "@/lib/projectFilters";
import { cn } from "@/lib/cn";

export type { SortOption };

type FilterPanelProps = {
  searchQuery: string;
  selectedDomain: string;
  selectedTechnologies: string[];
  selectedDifficulty: string;
  sortOption: SortOption;
  technologyMatchMode: TechnologyMatchMode;
  beginnerFriendly?: boolean;
  goodFirstIssue?: boolean;
  minStars?: number;
  resultCount?: number;
  viewMode?: "grid" | "list";

  domains: string[];
  technologies: string[];

  onSearchChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  onTechnologyChange: (technology: string) => void;
  onTechnologyMatchModeChange: (mode: TechnologyMatchMode) => void;
  onDifficultyChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onBeginnerFriendlyToggle?: () => void;
  onGoodFirstIssueToggle?: () => void;
  onMinStarsChange?: (stars: number | undefined) => void;
  onViewModeChange?: (mode: "grid" | "list") => void;

  searchInputRef?: React.RefObject<HTMLInputElement | null>;
};

const DOMAIN_ICONS: Record<string, string> = {
  All: "🌐",
  "Web Development": "💻",
  Backend: "⚙️",
  "AI/ML": "🤖",
  Mobile: "📱",
  DevOps: "🛠️",
  Security: "🛡️",
  "Tools & Utilities": "🧰",
  "Data Science": "📊",
};

const DIFFICULTY_DOTS: Record<string, string> = {
  All: "bg-gray-400",
  Beginner: "bg-emerald-500",
  Intermediate: "bg-amber-500",
  Advanced: "bg-rose-500",
};

const SORT_ICONS: Record<SortOption, string> = {
  relevance: "🎯",
  "stars-desc": "🌟",
  "stars-asc": "⭐",
  "date-desc": "🕒",
  "name-asc": "🔤",
  "name-desc": "🔡",
};

export default function FilterPanel({
  searchQuery,
  selectedDomain,
  selectedTechnologies,
  selectedDifficulty,
  sortOption,
  technologyMatchMode,
  beginnerFriendly = false,
  goodFirstIssue = false,
  minStars,
  resultCount,
  viewMode = "grid",

  domains,
  technologies,

  onSearchChange,
  onDomainChange,
  onTechnologyChange,
  onTechnologyMatchModeChange,
  onDifficultyChange,
  onSortChange,
  onBeginnerFriendlyToggle,
  onGoodFirstIssueToggle,
  onMinStarsChange,
  onViewModeChange,

  searchInputRef,
}: FilterPanelProps) {
  // Dropdown states
  const [domainOpen, setDomainOpen] = useState(false);
  const [technologyOpen, setTechnologyOpen] = useState(false);
  const [difficultyOpen, setDifficultyOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [technologySearch, setTechnologySearch] = useState("");

  const domainRef = useRef<HTMLDivElement>(null);
  const technologyRef = useRef<HTMLDivElement>(null);
  const difficultyRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const filteredTechnologies = useMemo(() => {
    const query = technologySearch.toLowerCase().trim();
    if (!query) return technologies;
    return technologies.filter((t) => t.toLowerCase().includes(query));
  }, [technologies, technologySearch]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (domainRef.current && !domainRef.current.contains(target)) {
        setDomainOpen(false);
      }
      if (technologyRef.current && !technologyRef.current.contains(target)) {
        setTechnologyOpen(false);
      }
      if (difficultyRef.current && !difficultyRef.current.contains(target)) {
        setDifficultyOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDomainOpen(false);
        setTechnologyOpen(false);
        setDifficultyOpen(false);
        setSortOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="space-y-4">
      {/* ========================================
          SEARCH BAR
      ======================================== */}
      <SearchBar
        ref={searchInputRef}
        value={searchQuery}
        onChange={onSearchChange}
        resultCount={resultCount}
      />

      {/* ========================================
          QUICK PRESET FILTER PILLS
      ======================================== */}
      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-1 hidden sm:inline">
          Quick Filters:
        </span>

        {/* 1K+ Stars Pill */}
        {onMinStarsChange && (
          <button
            type="button"
            onClick={() => onMinStarsChange(minStars === 1000 ? undefined : 1000)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all shadow-2xs",
              minStars === 1000
                ? "border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20 dark:border-amber-500 dark:bg-amber-950/60 dark:text-amber-200"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            <span>🌟</span>
            <span>&gt;1K Stars</span>
          </button>
        )}

        {/* Good First Issue Pill */}
        {onGoodFirstIssueToggle && (
          <button
            type="button"
            onClick={onGoodFirstIssueToggle}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all shadow-2xs",
              goodFirstIssue
                ? "border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-200"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            <span>🌱</span>
            <span>Good First Issue</span>
          </button>
        )}

        {/* Beginner Friendly Pill */}
        {onBeginnerFriendlyToggle && (
          <button
            type="button"
            onClick={onBeginnerFriendlyToggle}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all shadow-2xs",
              beginnerFriendly
                ? "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-200"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            <span>🔰</span>
            <span>Beginner Friendly</span>
          </button>
        )}

        {/* Quick Domain Presets */}
        {["AI/ML", "Web Development", "Backend"].map((domain) => (
          <button
            key={domain}
            type="button"
            onClick={() => onDomainChange(selectedDomain === domain ? "All" : domain)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all shadow-2xs hidden md:inline-flex",
              selectedDomain === domain
                ? "border-indigo-500 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20 dark:border-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-200"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            <span>{DOMAIN_ICONS[domain] || "🏷️"}</span>
            <span>{domain}</span>
          </button>
        ))}

        {/* View Mode Switcher (Grid / List) */}
        {onViewModeChange && (
          <div className="ml-auto flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5 dark:border-gray-800 dark:bg-gray-900">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              aria-label="Grid View"
              title="Grid View"
              className={cn(
                "rounded-md p-1.5 text-xs transition-colors",
                viewMode === "grid"
                  ? "bg-white text-gray-900 shadow-2xs dark:bg-gray-800 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              )}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              aria-label="List View"
              title="List View"
              className={cn(
                "rounded-md p-1.5 text-xs transition-colors",
                viewMode === "list"
                  ? "bg-white text-gray-900 shadow-2xs dark:bg-gray-800 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              )}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ========================================
          CUSTOM STYLED DROPDOWN FILTERS
      ======================================== */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* DOMAIN DROPDOWN */}
        <div ref={domainRef} className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Domain
          </label>
          <button
            type="button"
            onClick={() => {
              setDomainOpen((o) => !o);
              setTechnologyOpen(false);
              setDifficultyOpen(false);
              setSortOpen(false);
            }}
            aria-expanded={domainOpen}
            className={cn(
              "flex h-11 w-full items-center justify-between rounded-xl border px-3 text-sm transition-all duration-150 sm:h-10",
              selectedDomain !== "All"
                ? "border-blue-500/50 bg-blue-50/50 text-blue-950 dark:border-blue-600/50 dark:bg-blue-950/40 dark:text-blue-200"
                : "border-gray-300 bg-gray-50 text-gray-800 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:border-gray-600"
            )}
          >
            <span className="flex items-center gap-2 truncate">
              <span>{DOMAIN_ICONS[selectedDomain] || "🏷️"}</span>
              <span className="truncate">{selectedDomain === "All" ? "All Domains" : selectedDomain}</span>
            </span>
            <svg
              className={cn("h-4 w-4 shrink-0 transition-transform duration-200", domainOpen && "rotate-180")}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 1.04l-4.25-4.51a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {domainOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:shadow-black/40">
              {domains.map((domain) => (
                <button
                  key={domain}
                  type="button"
                  onClick={() => {
                    onDomainChange(domain);
                    setDomainOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    selectedDomain === domain
                      ? "bg-blue-50 font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span>{DOMAIN_ICONS[domain] || "🏷️"}</span>
                    <span>{domain === "All" ? "All Domains" : domain}</span>
                  </span>
                  {selectedDomain === domain && <span className="text-blue-600 dark:text-blue-400">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TECHNOLOGY DROPDOWN */}
        <div ref={technologyRef} className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Technology
          </label>
          <button
            id="technology-filter"
            type="button"
            onClick={() => {
              setTechnologyOpen((open) => !open);
              setDomainOpen(false);
              setDifficultyOpen(false);
              setSortOpen(false);
            }}
            aria-expanded={technologyOpen}
            aria-haspopup="listbox"
            className={cn(
              "flex h-11 w-full items-center justify-between rounded-xl border px-3 text-sm transition-all duration-150 sm:h-10",
              selectedTechnologies.length > 0
                ? "border-blue-500/50 bg-blue-50/50 text-blue-950 dark:border-blue-600/50 dark:bg-blue-950/40 dark:text-blue-200"
                : "border-gray-300 bg-gray-50 text-gray-800 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:border-gray-600"
            )}
          >
            <span className="flex items-center gap-2 truncate">
              <span>⚡</span>
              <span className="truncate">
                {selectedTechnologies.length === 0
                  ? "All technologies"
                  : `${selectedTechnologies.length} selected`}
              </span>
            </span>
            <svg
              className={cn("h-4 w-4 shrink-0 transition-transform duration-200", technologyOpen && "rotate-180")}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 1.04l-4.25-4.51a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {technologyOpen && (
            <div
              className="
                absolute left-0 right-0 top-full z-50 mt-1.5
                overflow-hidden rounded-2xl border border-gray-200 bg-white
                shadow-2xl dark:border-gray-700 dark:bg-gray-900 dark:shadow-black/60
                sm:left-auto sm:w-[420px] max-sm:max-w-[calc(100vw-2rem)]
              "
            >
              {/* SEARCH TECHNOLOGY */}
              <div className="border-b border-gray-100 p-3 dark:border-gray-800">
                <input
                  type="search"
                  value={technologySearch}
                  onChange={(e) => setTechnologySearch(e.target.value)}
                  placeholder="Search technology..."
                  autoFocus
                  className="
                    h-10 w-full rounded-lg border border-gray-300 bg-gray-50 px-3
                    text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100
                  "
                />
              </div>

              {/* MATCH MODE */}
              <div className="border-b border-gray-100 p-3 dark:border-gray-800">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Match Mode
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onTechnologyMatchModeChange("any")}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                      technologyMatchMode === "any"
                        ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    Match ANY Tech
                  </button>
                  <button
                    type="button"
                    onClick={() => onTechnologyMatchModeChange("all")}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                      technologyMatchMode === "all"
                        ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    Match ALL Selected
                  </button>
                </div>
              </div>

              {/* TECH CHECKBOX LIST */}
              <div className="max-h-60 overflow-y-auto p-2">
                {filteredTechnologies.length > 0 ? (
                  <div className="grid grid-cols-1 gap-1 min-[420px]:grid-cols-2">
                    {filteredTechnologies.map((technology) => {
                      const isSelected = selectedTechnologies.includes(technology);
                      return (
                        <label
                          key={technology}
                          className={cn(
                            "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-colors",
                            isSelected
                              ? "bg-blue-50 font-medium text-blue-900 dark:bg-blue-950/60 dark:text-blue-200"
                              : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onTechnologyChange(technology)}
                            className="h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                          />
                          <span className="truncate">{technology}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <p className="px-3 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
                    No technology found.
                  </p>
                )}
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <span>{selectedTechnologies.length} selected</span>
                {technologySearch && (
                  <button
                    type="button"
                    onClick={() => setTechnologySearch("")}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* DIFFICULTY DROPDOWN */}
        <div ref={difficultyRef} className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Difficulty
          </label>
          <button
            type="button"
            onClick={() => {
              setDifficultyOpen((o) => !o);
              setDomainOpen(false);
              setTechnologyOpen(false);
              setSortOpen(false);
            }}
            aria-expanded={difficultyOpen}
            className={cn(
              "flex h-11 w-full items-center justify-between rounded-xl border px-3 text-sm transition-all duration-150 sm:h-10",
              selectedDifficulty !== "All"
                ? "border-blue-500/50 bg-blue-50/50 text-blue-950 dark:border-blue-600/50 dark:bg-blue-950/40 dark:text-blue-200"
                : "border-gray-300 bg-gray-50 text-gray-800 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:border-gray-600"
            )}
          >
            <span className="flex items-center gap-2 truncate">
              <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", DIFFICULTY_DOTS[selectedDifficulty] || "bg-gray-400")} />
              <span className="truncate">{selectedDifficulty === "All" ? "All Difficulties" : selectedDifficulty}</span>
            </span>
            <svg
              className={cn("h-4 w-4 shrink-0 transition-transform duration-200", difficultyOpen && "rotate-180")}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 1.04l-4.25-4.51a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {difficultyOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:shadow-black/40">
              {DIFFICULTIES.map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  onClick={() => {
                    onDifficultyChange(difficulty);
                    setDifficultyOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    selectedDifficulty === difficulty
                      ? "bg-blue-50 font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", DIFFICULTY_DOTS[difficulty])} />
                    <span>{difficulty === "All" ? "All Difficulties" : difficulty}</span>
                  </span>
                  {selectedDifficulty === difficulty && <span className="text-blue-600 dark:text-blue-400">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SORT DROPDOWN */}
        <div ref={sortRef} className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Sort Order
          </label>
          <button
            type="button"
            onClick={() => {
              setSortOpen((o) => !o);
              setDomainOpen(false);
              setTechnologyOpen(false);
              setDifficultyOpen(false);
            }}
            aria-expanded={sortOpen}
            className={cn(
              "flex h-11 w-full items-center justify-between rounded-xl border px-3 text-sm transition-all duration-150 sm:h-10",
              sortOption !== "relevance"
                ? "border-blue-500/50 bg-blue-50/50 text-blue-950 dark:border-blue-600/50 dark:bg-blue-950/40 dark:text-blue-200"
                : "border-gray-300 bg-gray-50 text-gray-800 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:border-gray-600"
            )}
          >
            <span className="flex items-center gap-2 truncate">
              <span>{SORT_ICONS[sortOption] || "🎯"}</span>
              <span className="truncate">{SORT_LABELS[sortOption]}</span>
            </span>
            <svg
              className={cn("h-4 w-4 shrink-0 transition-transform duration-200", sortOpen && "rotate-180")}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 1.04l-4.25-4.51a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {sortOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:shadow-black/40">
              {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onSortChange(option);
                    setSortOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    sortOption === option
                      ? "bg-blue-50 font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span>{SORT_ICONS[option]}</span>
                    <span>{SORT_LABELS[option]}</span>
                  </span>
                  {sortOption === option && <span className="text-blue-600 dark:text-blue-400">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}