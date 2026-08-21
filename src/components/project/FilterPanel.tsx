"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import SearchBar from "@/components/project/SearchBar";
import { Select } from "@/components/ui/Input";

import {
  DIFFICULTIES,
  SORT_LABELS,
  type SortOption,
} from "@/lib/projectFilters";

import { cn } from "@/lib/cn";

export type { SortOption };

type FilterPanelProps = {
  searchQuery: string;
  selectedDomain: string;
  selectedTechnologies: string[];
  selectedDifficulty: string;
  sortOption: SortOption;

  domains: string[];
  technologies: string[];

  onSearchChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  onTechnologyChange: (technology: string) => void;
  onDifficultyChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;

  searchInputRef?: React.RefObject<HTMLInputElement | null>;
};

export default function FilterPanel({
  searchQuery,
  selectedDomain,
  selectedTechnologies,
  selectedDifficulty,
  sortOption,

  domains,
  technologies,

  onSearchChange,
  onDomainChange,
  onTechnologyChange,
  onDifficultyChange,
  onSortChange,

  searchInputRef,
}: FilterPanelProps) {
  const [technologyOpen, setTechnologyOpen] =
    useState(false);

  const [technologySearch, setTechnologySearch] =
    useState("");

  const technologyRef =
    useRef<HTMLDivElement>(null);

  const filteredTechnologies = useMemo(() => {
    const query =
      technologySearch.toLowerCase().trim();

    if (!query) {
      return technologies;
    }

    return technologies.filter((technology) =>
      technology
        .toLowerCase()
        .includes(query)
    );
  }, [technologies, technologySearch]);

  /* ========================================
     CLOSE TECHNOLOGY DROPDOWN
  ======================================== */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        technologyRef.current &&
        !technologyRef.current.contains(
          event.target as Node
        )
      ) {
        setTechnologyOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ========================================
     CLOSE WITH ESCAPE
  ======================================== */

  useEffect(() => {
    if (!technologyOpen) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setTechnologyOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [technologyOpen]);

  return (
    <div className="space-y-4">
      {/* ========================================
          SEARCH
      ======================================== */}

      <SearchBar
        ref={searchInputRef}
        value={searchQuery}
        onChange={onSearchChange}
      />

      {/* ========================================
          FILTERS
      ======================================== */}

      <div
        className="
          grid
          gap-3
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {/* ========================================
            DOMAIN
        ======================================== */}

        <Select
          label="Domain"
          id="domain"
          value={selectedDomain}
          onChange={(event) =>
            onDomainChange(
              event.target.value
            )
          }
        >
          {domains.map((domain) => (
            <option
              key={domain}
              value={domain}
            >
              {domain}
            </option>
          ))}
        </Select>

        {/* ========================================
            TECHNOLOGY
        ======================================== */}

        <div
          ref={technologyRef}
          className="relative"
        >
          <label
            htmlFor="technology-filter"
            className="
              mb-1.5
              block
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-gray-500
              dark:text-gray-400
            "
          >
            Technology
          </label>

          <button
            id="technology-filter"
            type="button"
            onClick={() =>
              setTechnologyOpen(
                (open) => !open
              )
            }
            aria-expanded={technologyOpen}
            aria-haspopup="listbox"
            className="
              flex
              h-11
              w-full
              items-center
              justify-between
              rounded-lg
              border
              border-gray-300
              bg-gray-50
              px-3
              text-sm
              text-gray-800
              outline-none
              transition-all
              duration-150

              hover:border-gray-400

              focus:border-gray-900
              focus:ring-2
              focus:ring-gray-900/10

              dark:border-gray-700
              dark:bg-gray-950
              dark:text-gray-100

              dark:hover:border-gray-600
              dark:hover:bg-gray-900

              dark:focus:border-gray-500
              dark:focus:bg-gray-950
              dark:focus:ring-gray-400/20

              sm:h-10
            "
          >
            <span className="truncate">
              {selectedTechnologies.length ===
              0
                ? "All technologies"
                : `${selectedTechnologies.length} selected`}
            </span>

            <svg
              className={cn(
                "ml-2 h-4 w-4 shrink-0 transition-transform duration-200",
                technologyOpen &&
                  "rotate-180"
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 1.04l-4.25-4.51a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* TECHNOLOGY DROPDOWN */}

          {technologyOpen && (
            <div
              className="
                absolute
                left-0
                right-0
                top-full
                z-50
                mt-2
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
                shadow-xl

                dark:border-gray-700
                dark:bg-gray-900
                dark:shadow-black/40

                sm:left-auto
                sm:w-105

                max-sm:max-w-[calc(100vw-2rem)]
              "
            >
              {/* Search technology */}

              <div
                className="
                  border-b
                  border-gray-100
                  p-3
                  dark:border-gray-800
                "
              >
                <input
                  type="search"
                  value={technologySearch}
                  onChange={(event) =>
                    setTechnologySearch(
                      event.target.value
                    )
                  }
                  placeholder="Search technology..."
                  autoFocus
                  className="
                    h-10
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-gray-50
                    px-3
                    text-sm
                    text-gray-900
                    outline-none

                    focus:border-gray-900
                    focus:ring-2
                    focus:ring-gray-900/10

                    dark:border-gray-700
                    dark:bg-gray-950
                    dark:text-gray-100

                    dark:focus:border-gray-500
                    dark:focus:bg-gray-950
                    dark:focus:ring-gray-400/20
                  "
                />
              </div>

              {/* Technology list */}

              <div
                className="
                  max-h-64
                  overflow-y-auto
                  overscroll-contain
                  p-2
                  sm:max-h-60
                "
              >
                {filteredTechnologies.length >
                0 ? (
                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-1
                      min-[420px]:grid-cols-2
                    "
                  >
                    {filteredTechnologies.map(
                      (technology) => {
                        const isSelected =
                          selectedTechnologies.includes(
                            technology
                          );

                        return (
                          <label
                            key={technology}
                            className={cn(
                              `
                                flex
                                min-h-11
                                cursor-pointer
                                items-center
                                gap-3
                                rounded-lg
                                px-3
                                py-2.5
                                text-sm
                                transition-colors
                              `,
                              isSelected
                                ? `
                                    bg-gray-100
                                    text-gray-900

                                    dark:bg-gray-800
                                    dark:text-white
                                  `
                                : `
                                    text-gray-700
                                    hover:bg-gray-50

                                    dark:text-gray-300
                                    dark:hover:bg-gray-800
                                  `
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                onTechnologyChange(
                                  technology
                                )
                              }
                              className="
                                h-4
                                w-4
                                shrink-0
                                rounded
                                border-gray-300
                                accent-gray-900

                                dark:border-gray-600
                                dark:accent-white
                              "
                            />

                            <span className="min-w-0 truncate">
                              {technology}
                            </span>
                          </label>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <p
                    className="
                      px-3
                      py-8
                      text-center
                      text-sm
                      text-gray-500

                      dark:text-gray-400
                    "
                  >
                    No technology found.
                  </p>
                )}
              </div>

              {/* Dropdown footer */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-t
                  border-gray-100
                  px-3
                  py-2.5

                  dark:border-gray-800
                "
              >
                <span
                  className="
                    text-xs
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {
                    selectedTechnologies.length
                  }{" "}
                  selected
                </span>

                {technologySearch && (
                  <button
                    type="button"
                    onClick={() =>
                      setTechnologySearch("")
                    }
                    className="
                      text-xs
                      font-medium
                      text-gray-600
                      hover:text-gray-900

                      dark:text-gray-400
                      dark:hover:text-white
                    "
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ========================================
            DIFFICULTY
        ======================================== */}

        <Select
          label="Difficulty"
          id="difficulty"
          value={selectedDifficulty}
          onChange={(event) =>
            onDifficultyChange(
              event.target.value
            )
          }
        >
          {DIFFICULTIES.map(
            (difficulty) => (
              <option
                key={difficulty}
                value={difficulty}
              >
                {difficulty}
              </option>
            )
          )}
        </Select>

        {/* ========================================
            SORT
        ======================================== */}

        <Select
          label="Sort"
          id="sort"
          value={sortOption}
          onChange={(event) =>
            onSortChange(
              event.target.value as SortOption
            )
          }
        >
          {(
            Object.keys(
              SORT_LABELS
            ) as SortOption[]
          ).map((option) => (
            <option
              key={option}
              value={option}
            >
              {SORT_LABELS[option]}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}