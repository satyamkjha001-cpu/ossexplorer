"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import HighlightText from "@/components/ui/HighlightText";
import { cn } from "@/lib/cn";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSelectProject?: (projectId: number) => void;
  resultCount?: number;
  placeholder?: string;
  id?: string;
  label?: string;
  autoFocus?: boolean;
  className?: string;
};

const TRENDING_SEARCHES = [
  { label: "AI & ML", query: "AI" },
  { label: "Next.js", query: "Next.js" },
  { label: "TypeScript", query: "TypeScript" },
  { label: "Rust", query: "Rust" },
  { label: "Dashboard", query: "Dashboard" },
  { label: "Python", query: "Python" },
];

const RECENT_SEARCHES_KEY = "os_explorer_recent_searches";

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
    {
      value,
      onChange,
      onSelectProject,
      resultCount,
      placeholder = "Search by name, description, tech (e.g. Next.js, AI, Python)...",
      id = "project-search",
      label = "Search projects",
      autoFocus = false,
      className,
    },
    forwardedRef
  ) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    // Expose inputRef to forwardedRef
    useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

    // Load recent searches from localStorage
    useEffect(() => {
      try {
        const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setRecentSearches(parsed.slice(0, 5));
          }
        }
      } catch {
        // Ignore JSON error
      }
    }, []);

    const saveSearchQuery = useCallback((query: string) => {
      const trimmed = query.trim();
      if (!trimmed || trimmed.length < 2) return;
      setRecentSearches((prev) => {
        const filtered = prev.filter(
          (item) => item.toLowerCase() !== trimmed.toLowerCase()
        );
        const updated = [trimmed, ...filtered].slice(0, 5);
        try {
          localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
        } catch {
          // Ignore storage error
        }
        return updated;
      });
    }, []);

    const removeRecentSearch = (e: React.MouseEvent, itemToRemove: string) => {
      e.stopPropagation();
      setRecentSearches((prev) => {
        const updated = prev.filter((item) => item !== itemToRemove);
        try {
          localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
        } catch {
          // Ignore
        }
        return updated;
      });
    };

    const clearAllRecentSearches = (e: React.MouseEvent) => {
      e.stopPropagation();
      setRecentSearches([]);
      try {
        localStorage.removeItem(RECENT_SEARCHES_KEY);
      } catch {
        // Ignore
      }
    };

    // Close flyout on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter project suggestions based on current search value
    const matchingSuggestions = useMemo(() => {
      const query = value.trim().toLowerCase();
      if (!query) return [];

      return projects
        .filter((project) => {
          const text = `${project.name} ${project.description} ${project.domain} ${project.technologies.join(" ")}`.toLowerCase();
          return text.includes(query);
        })
        .slice(0, 4);
    }, [value]);

    const handleClear = () => {
      onChange("");
      inputRef.current?.focus();
    };

    const handleSelectSuggestion = (query: string) => {
      onChange(query);
      saveSearchQuery(query);
      setIsOpen(false);
      inputRef.current?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      } else if (event.key === "Enter") {
        if (value.trim()) {
          saveSearchQuery(value);
        }
        setIsOpen(false);
      }
    };

    const suggestionsListId = `${id}-suggestions-list`;

    return (
      <div ref={containerRef} className={cn("relative w-full", className)}>
        {label && (
          <label htmlFor={id} className="sr-only">
            {label}
          </label>
        )}

        {/* Outer Glow Wrapper on Focus */}
        <div
          className={cn(
            "group relative flex items-center rounded-2xl border transition-all duration-200",
            "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md",
            isOpen
              ? "border-blue-500/80 ring-4 ring-blue-500/10 shadow-lg shadow-blue-500/5 dark:border-blue-500/80 dark:ring-blue-500/20"
              : "border-gray-200/90 shadow-sm hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
          )}
        >
          {/* Search Icon with Animated Gradient Glow */}
          <div className="pointer-events-none flex items-center pl-4 pr-1 text-gray-400 dark:text-gray-500">
            <svg
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                isOpen && "scale-110 text-blue-600 dark:text-blue-400"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>

          {/* Search Input Field */}
          <input
            ref={inputRef}
            id={id}
            type="search"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={suggestionsListId}
            aria-autocomplete="list"
            autoFocus={autoFocus}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="
              h-12 w-full bg-transparent px-3 text-sm sm:text-base font-normal text-gray-900
              placeholder:text-gray-400 outline-none
              dark:text-gray-100 dark:placeholder:text-gray-500
            "
          />

          {/* Result Count Badge (when searching) */}
          {value.trim() && resultCount !== undefined && (
            <div className="hidden min-[480px]:flex items-center mr-2 shrink-0">
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/70 dark:text-blue-300">
                {resultCount} {resultCount === 1 ? "match" : "matches"}
              </span>
            </div>
          )}

          {/* Clear Button */}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search text"
              className="
                mr-2 flex h-7 w-7 items-center justify-center rounded-full
                text-gray-400 hover:bg-gray-100 hover:text-gray-700
                dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200
                transition-colors
              "
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Keyboard Shortcut Badge */}
          <div className="hidden sm:flex items-center pr-3">
            <kbd className="inline-flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 font-mono text-[11px] font-medium text-gray-500 shadow-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <span className="text-xs">/</span>
            </kbd>
          </div>
        </div>

        {/* ========================================
            INSTANT AUTOCOMPLETE FLYOUT / SUGGESTIONS
        ======================================== */}
        {isOpen && (
          <div
            id={suggestionsListId}
            role="listbox"
            className="
              absolute left-0 right-0 top-full z-50 mt-2
              overflow-hidden rounded-2xl border border-gray-200 bg-white/95
              shadow-2xl backdrop-blur-xl transition-all
              dark:border-gray-800 dark:bg-gray-900/95 dark:shadow-black/60
              motion-safe:animate-fade-in
            "
          >
            {/* Live Search Matching Projects */}
            {value.trim() ? (
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5 dark:border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Matching Projects
                  </span>
                  <span className="text-xs text-gray-400">
                    Press <kbd className="rounded border px-1 py-0.2 font-mono text-[10px]">Enter</kbd> to filter list
                  </span>
                </div>

                {matchingSuggestions.length > 0 ? (
                  <div className="divide-y divide-gray-100 p-1 dark:divide-gray-800">
                    {matchingSuggestions.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => {
                          saveSearchQuery(value);
                          if (onSelectProject) {
                            onSelectProject(project.id);
                          } else {
                            router.push(`/projects/${project.id}`);
                          }
                          setIsOpen(false);
                        }}
                        className="
                          group flex cursor-pointer items-center justify-between
                          rounded-xl p-3 transition-colors
                          hover:bg-blue-50/70 dark:hover:bg-blue-950/40
                        "
                      >
                        <div className="min-w-0 flex-1 pr-3">
                          <div className="flex items-center gap-2">
                            <h4 className="truncate text-sm font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                              <HighlightText text={project.name} query={value} />
                            </h4>
                            <span className="shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                              {project.domain}
                            </span>
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                            <HighlightText text={project.description} query={value} />
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400">
                          <span>★ {project.stars.toLocaleString()}</span>
                          <span className="text-gray-300 dark:text-gray-600">→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>No quick preview match for &ldquo;{value}&rdquo;</p>
                    <p className="mt-1 text-xs text-gray-400">
                      Press Enter to apply full multi-field filter
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* When Input is Empty: Show Recent & Trending */
              <div className="p-3">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between px-2 pb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        Recent Searches
                      </span>
                      <button
                        type="button"
                        onClick={clearAllRecentSearches}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Clear history
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 px-1">
                      {recentSearches.map((item) => (
                        <div
                          key={item}
                          onClick={() => handleSelectSuggestion(item)}
                          className="
                            group inline-flex cursor-pointer items-center gap-1.5
                            rounded-lg border border-gray-200 bg-gray-50/80 px-2.5 py-1.5
                            text-xs font-medium text-gray-700 transition-colors
                            hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700
                            dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300
                            dark:hover:border-blue-700 dark:hover:bg-blue-950/60 dark:hover:text-blue-300
                          "
                        >
                          <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={(e) => removeRecentSearch(e, item)}
                            aria-label={`Remove ${item}`}
                            className="rounded-full p-0.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending / Recommended Queries */}
                <div>
                  <div className="px-2 pb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Popular Searches
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 px-1">
                    {TRENDING_SEARCHES.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleSelectSuggestion(item.query)}
                        className="
                          inline-flex items-center gap-1.5 rounded-lg border border-gray-200
                          bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-2xs
                          transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700
                          dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200
                          dark:hover:border-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-300
                        "
                      >
                        <span className="text-blue-500">🔍</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Dropdown Footer Tip */}
            <div className="border-t border-gray-100 bg-gray-50/80 px-4 py-2 text-[11px] text-gray-500 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-400 flex items-center justify-between">
              <span>Tip: Use multiple words to refine search</span>
              <span className="hidden min-[480px]:inline">
                Press <kbd className="rounded border px-1 py-0.2 font-mono text-[9px]">Esc</kbd> to close
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default SearchBar;
