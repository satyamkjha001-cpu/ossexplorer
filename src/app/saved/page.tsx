"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

import ProjectCard from "@/components/project/ProjectCard";
import ProjectListView from "@/components/project/ProjectListView";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { projects } from "@/data/projects";
import {
  getBookmarkSnapshot,
  subscribeToBookmarks,
} from "@/lib/bookmarks";

export default function SavedProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const bookmarkSnapshot = useSyncExternalStore(
    subscribeToBookmarks,
    getBookmarkSnapshot,
    () => ""
  );

  const savedProjectIds = useMemo<number[]>(() => {
    if (!bookmarkSnapshot) return [];
    try {
      const parsed = JSON.parse(bookmarkSnapshot);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [bookmarkSnapshot]);

  const savedProjects = useMemo(() => {
    const matched = projects.filter((project) =>
      savedProjectIds.includes(project.id)
    );

    if (!searchQuery.trim()) return matched;

    const q = searchQuery.toLowerCase().trim();
    return matched.filter((project) => {
      const text = `${project.name} ${project.description} ${project.domain} ${project.technologies.join(" ")}`.toLowerCase();
      return text.includes(q);
    });
  }, [savedProjectIds, searchQuery]);

  const handleClearAllBookmarks = () => {
    if (window.confirm("Are you sure you want to clear all bookmarked projects?")) {
      try {
        localStorage.setItem("open-source-project-bookmarks", JSON.stringify([]));
        window.dispatchEvent(new Event("bookmark-change"));
      } catch {
        // Ignore
      }
    }
  };

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
            HEADER & ACTIONS
        ======================================== */}
        <div className="flex flex-col gap-4 border-b border-gray-200/80 pb-8 dark:border-gray-800/80 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                ★
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Your Collection
              </p>
            </div>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Saved Projects
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Repositories you&apos;ve bookmarked for contribution or future reference.
            </p>
          </div>

          {savedProjectIds.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                {savedProjectIds.length} {savedProjectIds.length === 1 ? "project" : "projects"} saved
              </span>

              <button
                type="button"
                onClick={handleClearAllBookmarks}
                className="text-xs font-medium text-gray-500 hover:text-red-600 transition-colors dark:text-gray-400 dark:hover:text-red-400"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* ========================================
            IN-PAGE FILTER & VIEW BAR
        ======================================== */}
        {savedProjectIds.length > 0 && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-xs">
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter saved projects..."
                inputSize="sm"
                icon="⌕"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-gray-400">
                Showing {savedProjects.length} of {savedProjectIds.length}
              </span>

              {/* View Switcher */}
              <div className="flex items-center rounded-lg border border-gray-200 bg-white p-0.5 dark:border-gray-800 dark:bg-gray-900">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                  className={`rounded-md p-1.5 text-xs transition-colors ${
                    viewMode === "grid"
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                      : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  ⊞
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List View"
                  className={`rounded-md p-1.5 text-xs transition-colors ${
                    viewMode === "list"
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                      : "text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================
            SAVED PROJECTS CONTENT
        ======================================== */}
        {savedProjectIds.length > 0 ? (
          savedProjects.length > 0 ? (
            <div className="mt-6 motion-safe:animate-fade-in">
              {viewMode === "grid" ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {savedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      searchQuery={searchQuery}
                    />
                  ))}
                </div>
              ) : (
                <ProjectListView
                  projects={savedProjects}
                  searchQuery={searchQuery}
                />
              )}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900/40">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No saved projects match &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                Clear filter
              </button>
            </div>
          )
        ) : (
          /* ========================================
             EMPTY STATE
          ======================================== */
          <div
            className="
              mt-10
              rounded-3xl
              border
              border-dashed
              border-gray-300
              bg-white
              px-6
              py-16
              text-center
              shadow-2xs
              dark:border-gray-800
              dark:bg-gray-900/40
              sm:py-24
            "
          >
            <div className="mx-auto max-w-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600 shadow-2xs dark:bg-blue-950/60 dark:text-blue-400">
                ★
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                No saved projects yet
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Browse through curated open-source projects and bookmark the ones you want to save for contributions or study.
              </p>

              <div className="mt-8 flex justify-center">
                <Button
                  href="/projects"
                  size="lg"
                  className="min-h-11 px-8 shadow-xs"
                >
                  Explore Repositories
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}