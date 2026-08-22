"use client";

import { useEffect, useRef, useState } from "react";

import ActiveFilterChips from "@/components/project/ActiveFilterChips";
import FilterPanel from "@/components/project/FilterPanel";
import ProjectGrid from "@/components/project/ProjectGrid";
import ProjectListView from "@/components/project/ProjectListView";
import Button from "@/components/ui/Button";
import { ProjectsPageSkeleton } from "@/components/ui/Loading";
import SectionHeader from "@/components/ui/SectionHeader";

import { useProjectFilters } from "@/hooks/useProjectFilters";

export default function ProjectsContent() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

    handleBeginnerFriendlyToggle,
    handleGoodFirstIssueToggle,
    handleMinStarsChange,

    removeTechnology,
    clearFilters,
    clearSearch,
    loadMore,
  } = useProjectFilters();

  /* ========================================
     "/" → FOCUS SEARCH
  ======================================== */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (
        (event.key === "/" || (event.key === "k" && (event.metaKey || event.ctrlKey))) &&
        !isTyping
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
    `${filters.beginnerFriendly}-` +
    `${filters.goodFirstIssue}-` +
    `${filters.minStars}-` +
    `${filters.sortOption}-${viewMode}`;

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
          eyebrow="Open Source Explorer"
          title="Explore Projects"
          description="Discover open-source repositories by domain, technology, difficulty, and contribution opportunities."
        />

        {/* ========================================
            FILTER SECTION (Sticky)
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
              p-3.5
              shadow-sm
              dark:border-gray-800
              dark:bg-gray-900
              sm:p-5
            "
          >
            {/* FILTER PANEL */}
            <FilterPanel
              searchQuery={filters.searchQuery}
              selectedDomain={filters.selectedDomain}
              selectedTechnologies={filters.selectedTechnologies}
              technologyMatchMode={filters.technologyMatchMode}
              selectedDifficulty={filters.selectedDifficulty}
              sortOption={filters.sortOption}
              beginnerFriendly={filters.beginnerFriendly}
              goodFirstIssue={filters.goodFirstIssue}
              minStars={filters.minStars}
              resultCount={sortedProjects.length}
              viewMode={viewMode}
              domains={domains}
              technologies={technologies}
              onSearchChange={handleSearchChange}
              onDomainChange={handleDomainChange}
              onTechnologyChange={handleTechnologyChange}
              onTechnologyMatchModeChange={handleTechnologyMatchModeChange}
              onDifficultyChange={handleDifficultyChange}
              onSortChange={handleSortChange}
              onBeginnerFriendlyToggle={handleBeginnerFriendlyToggle}
              onGoodFirstIssueToggle={handleGoodFirstIssueToggle}
              onMinStarsChange={handleMinStarsChange}
              onViewModeChange={setViewMode}
              searchInputRef={searchInputRef}
            />

            {/* ACTIVE FILTER CHIPS */}
            <ActiveFilterChips
              searchQuery={filters.searchQuery}
              selectedDomain={filters.selectedDomain}
              selectedTechnologies={filters.selectedTechnologies}
              selectedDifficulty={filters.selectedDifficulty}
              sortOption={filters.sortOption}
              beginnerFriendly={filters.beginnerFriendly}
              goodFirstIssue={filters.goodFirstIssue}
              minStars={filters.minStars}
              activeFilterCount={activeFilterCount}
              onClearSearch={clearSearch}
              onDomainChange={handleDomainChange}
              onRemoveTechnology={removeTechnology}
              onDifficultyChange={handleDifficultyChange}
              onSortChange={handleSortChange}
              onBeginnerFriendlyToggle={handleBeginnerFriendlyToggle}
              onGoodFirstIssueToggle={handleGoodFirstIssueToggle}
              onMinStarsChange={handleMinStarsChange}
              onClearAll={clearFilters}
            />
          </div>

          {/* KEYBOARD SHORTCUT HELPER */}
          <div className="mt-2 flex items-center justify-between px-1 text-xs text-gray-400 dark:text-gray-500">
            <span className="hidden sm:inline">
              Press{" "}
              <kbd className="rounded border border-gray-300 px-1 py-0.5 font-mono text-[10px] dark:border-gray-700">
                /
              </kbd>{" "}
              or{" "}
              <kbd className="rounded border border-gray-300 px-1 py-0.5 font-mono text-[10px] dark:border-gray-700">
                ⌘K
              </kbd>{" "}
              to quickly search
            </span>
          </div>
        </div>

        {/* ========================================
            RESULT COUNT & STATUS BAR
        ======================================== */}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(visibleProjects.length, sortedProjects.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {sortedProjects.length}
            </span>{" "}
            {sortedProjects.length === 1 ? "project" : "projects"}
            {filtersActive && (
              <span className="text-gray-400 dark:text-gray-500">
                {" "}
                · {activeFilterCount} filter
                {activeFilterCount === 1 ? "" : "s"} active
              </span>
            )}
          </p>
        </div>

        {/* ========================================
            PROJECT RESULTS (GRID OR LIST)
        ======================================== */}

        {visibleProjects.length > 0 ? (
          <>
            <div key={gridKey} className="mt-5 motion-safe:animate-fade-in">
              {viewMode === "grid" ? (
                <ProjectGrid
                  projects={visibleProjects}
                  searchQuery={filters.searchQuery}
                />
              ) : (
                <ProjectListView
                  projects={visibleProjects}
                  searchQuery={filters.searchQuery}
                />
              )}
            </div>

            {/* LOAD MORE */}
            {hasMoreProjects && (
              <div className="mt-10 flex justify-center">
                <Button
                  onClick={loadMore}
                  className="min-h-11 px-8 shadow-xs transition-all hover:scale-105"
                >
                  Load More ({sortedProjects.length - visibleProjects.length} remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          /* ========================================
             EMPTY STATE WITH SMART RECOVERY
          ======================================== */
          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900/50">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl dark:bg-blue-950/60">
              🔍
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
              {filters.searchQuery.trim() ? "No matching projects found" : "No projects match your filters"}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
              {filters.searchQuery.trim()
                ? `No projects matched "${filters.searchQuery.trim()}". Try searching for a technology like React, Python, Next.js, or AI.`
                : "No projects match the selected filters. Try broadening your criteria or clearing some filters."}
            </p>

            {/* Recommended quick search suggestions */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-gray-400">Try searching:</span>
              {["React", "Next.js", "AI", "Python", "Rust", "TypeScript"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleSearchChange(tag)}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-600 dark:hover:bg-blue-950/60"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <Button onClick={clearFilters}>
                {filtersActive ? "Clear all filters" : "Browse all projects"}
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}