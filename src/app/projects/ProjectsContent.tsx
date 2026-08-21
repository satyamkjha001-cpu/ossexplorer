"use client";

import { useEffect, useRef } from "react";

import ActiveFilterChips from "@/components/project/ActiveFilterChips";
import FilterPanel from "@/components/project/FilterPanel";
import ProjectGrid from "@/components/project/ProjectGrid";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { ProjectsPageSkeleton } from "@/components/ui/Loading";
import SectionHeader from "@/components/ui/SectionHeader";

import { useProjectFilters } from "@/hooks/useProjectFilters";

export default function ProjectsContent() {
  const searchInputRef =
    useRef<HTMLInputElement>(null);

  const {
    filters,
    filtersInitialized,
    domains,
    technologies,
    sortedProjects,
    visibleProjects,
    hasMoreProjects,
    activeFilterCount,
    filtersActive,

    handleSearchChange,
    handleDomainChange,
    handleTechnologyChange,
    handleTechnologyMatchModeChange,
    handleDifficultyChange,
    handleSortChange,

    removeTechnology,
    clearFilters,
    clearSearch,
    loadMore,
  } = useProjectFilters();

  /* ========================================
     "/" → FOCUS SEARCH
  ======================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const target =
        event.target as HTMLElement;

      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (
        event.key === "/" &&
        !isTyping &&
        !event.metaKey &&
        !event.ctrlKey
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* ========================================
     LOADING
  ======================================== */

  if (!filtersInitialized) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <ProjectsPageSkeleton />
      </main>
    );
  }

  /* ========================================
     GRID KEY
  ======================================== */

  const gridKey =
    `${filters.searchQuery}-` +
    `${filters.selectedDomain}-` +
    `${filters.selectedTechnologies.join(",")}-` +
    `${filters.technologyMatchMode}-` +
    `${filters.selectedDifficulty}-` +
    `${filters.sortOption}`;

  return (
    <main
      className="
        min-h-screen
        bg-gray-50
        text-gray-900
        transition-colors
        duration-200
        dark:bg-gray-950
        dark:text-gray-100
      "
    >
      <section
        className="
          mx-auto
          max-w-7xl
          px-4
          py-10
          sm:px-6
          sm:py-12
        "
      >
        {/* ========================================
            HEADER
        ======================================== */}

        <SectionHeader
          eyebrow="Open Source"
          title="Explore Projects"
          description="Discover open-source projects across different domains, technologies, and difficulty levels."
        />

        {/* ========================================
            FILTER SECTION
        ======================================== */}

        <div
          className="
            sticky
            top-16
            z-30
            -mx-4
            mt-8
            bg-gray-50/95
            px-4
            py-3
            backdrop-blur-md
            dark:bg-gray-950/95
            sm:-mx-6
            sm:px-6
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-3
              shadow-sm
              dark:border-gray-800
              dark:bg-gray-900
              sm:p-4
            "
          >
            {/* FILTER PANEL */}

            <FilterPanel
              searchQuery={
                filters.searchQuery
              }
              selectedDomain={
                filters.selectedDomain
              }
              selectedTechnologies={
                filters.selectedTechnologies
              }
              technologyMatchMode={
                filters.technologyMatchMode
              }
              selectedDifficulty={
                filters.selectedDifficulty
              }
              sortOption={
                filters.sortOption
              }
              domains={domains}
              technologies={technologies}
              onSearchChange={
                handleSearchChange
              }
              onDomainChange={
                handleDomainChange
              }
              onTechnologyChange={
                handleTechnologyChange
              }
              onTechnologyMatchModeChange={
                handleTechnologyMatchModeChange
              }
              onDifficultyChange={
                handleDifficultyChange
              }
              onSortChange={
                handleSortChange
              }
              searchInputRef={
                searchInputRef
              }
            />

            {/* ACTIVE FILTER CHIPS */}

            <ActiveFilterChips
              searchQuery={
                filters.searchQuery
              }
              selectedDomain={
                filters.selectedDomain
              }
              selectedTechnologies={
                filters.selectedTechnologies
              }
              selectedDifficulty={
                filters.selectedDifficulty
              }
              sortOption={
                filters.sortOption
              }
              activeFilterCount={
                activeFilterCount
              }
              onClearSearch={
                clearSearch
              }
              onDomainChange={
                handleDomainChange
              }
              onRemoveTechnology={
                removeTechnology
              }
              onDifficultyChange={
                handleDifficultyChange
              }
              onSortChange={
                handleSortChange
              }
              onClearAll={
                clearFilters
              }
            />
          </div>

          {/* KEYBOARD SHORTCUT */}

          <p
            className="
              mt-2
              hidden
              text-xs
              text-gray-400
              dark:text-gray-500
              sm:block
            "
          >
            Press{" "}
            <kbd
              className="
                rounded
                border
                border-gray-300
                px-1
                py-0.5
                font-mono
                text-[10px]
                dark:border-gray-600
              "
            >
              /
            </kbd>{" "}
            to focus search
          </p>
        </div>

        {/* ========================================
            RESULT COUNT
        ======================================== */}

        <div className="mt-6">
          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            <span
              className="
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              {sortedProjects.length}
            </span>{" "}
            {sortedProjects.length === 1
              ? "project"
              : "projects"}

            {filtersActive && (
              <span
                className="
                  text-gray-400
                  dark:text-gray-500
                "
              >
                {" "}
                · {activeFilterCount}{" "}
                filter
                {activeFilterCount === 1
                  ? ""
                  : "s"}{" "}
                active
              </span>
            )}
          </p>
        </div>

        {/* ========================================
            PROJECT GRID
        ======================================== */}

        {visibleProjects.length > 0 ? (
          <>
            <div
              key={gridKey}
              className="
                mt-5
                motion-safe:animate-fade-in
              "
            >
              <ProjectGrid
                projects={visibleProjects}
              />
            </div>

            {/* LOAD MORE */}

            {hasMoreProjects && (
              <div className="mt-10 flex justify-center">
                <Button
                  onClick={loadMore}
                  className="min-h-11 px-8"
                >
                  Load More (
                  {sortedProjects.length -
                    visibleProjects.length}{" "}
                  remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          /* ========================================
             EMPTY STATE
          ======================================== */

          <EmptyState
            className="
              mt-8
              motion-safe:animate-fade-in
            "
            icon="🔍"
            title={
              filters.searchQuery.trim()
                ? "No projects found"
                : "No matching projects"
            }
            description={
              filters.searchQuery.trim()
                ? `No projects matched "${filters.searchQuery.trim()}". Try a different search term or remove some filters.`
                : "No projects match your current filters. Try removing a filter or changing your selection."
            }
            action={{
              label: filtersActive
                ? "Clear all filters"
                : "Browse all projects",
              onClick: clearFilters,
            }}
          />
        )}
      </section>
    </main>
  );
}