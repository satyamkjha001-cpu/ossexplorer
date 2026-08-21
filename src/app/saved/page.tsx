"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import ProjectCard from "@/components/project/ProjectCard";

import { projects } from "@/data/projects";

import {
  getBookmarkSnapshot,
  subscribeToBookmarks,
} from "@/lib/bookmarks";

export default function SavedProjectsPage() {
  const bookmarkSnapshot =
    useSyncExternalStore(
      subscribeToBookmarks,
      getBookmarkSnapshot,
      () => ""
    );

  let savedProjectIds: number[] = [];

  try {
    savedProjectIds = bookmarkSnapshot
      ? JSON.parse(bookmarkSnapshot)
      : [];
  } catch {
    savedProjectIds = [];
  }

  const savedProjects =
    projects.filter((project) =>
      savedProjectIds.includes(project.id)
    );

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

        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Your Collection
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Saved Projects
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
                Projects you've bookmarked for
                later.
              </p>
            </div>

            {savedProjects.length > 0 && (
              <span
                className="
                  w-fit
                  rounded-full
                  bg-gray-100
                  px-3
                  py-1.5
                  text-sm
                  font-medium
                  text-gray-700

                  dark:bg-gray-800
                  dark:text-gray-200
                "
              >
                {savedProjects.length}{" "}
                {savedProjects.length === 1
                  ? "project"
                  : "projects"}
              </span>
            )}
          </div>
        </div>

        {/* ========================================
            SAVED PROJECTS
        ======================================== */}

        {savedProjects.length > 0 ? (
          <div
            className="
              mt-8
              grid
              gap-6

              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {savedProjects.map(
              (project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              )
            )}
          </div>
        ) : (
          /* ========================================
             EMPTY STATE
          ======================================== */

          <div
            className="
              mt-8
              rounded-2xl
              border
              border-dashed
              border-gray-300
              bg-white
              px-5
              py-14
              text-center

              dark:border-gray-800
              dark:bg-gray-900

              sm:px-6
              sm:py-20
            "
          >
            <div className="mx-auto max-w-md">
              {/* Icon */}

              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100

                  dark:bg-gray-800
                "
              >
                <span
                  className="
                    text-2xl
                    text-gray-500

                    dark:text-gray-400
                  "
                  aria-hidden="true"
                >
                  ☆
                </span>
              </div>

              {/* Heading */}

              <h2 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">
                No saved projects yet
              </h2>

              {/* Description */}

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Explore open-source projects
                and bookmark the ones you
                want to contribute to.
              </p>

              {/* Action */}

              <Link
                href="/projects"
                className="
                  mt-6
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  rounded-lg
                  bg-gray-900
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-150

                  hover:-translate-y-0.5
                  hover:bg-gray-700

                  focus:outline-none
                  focus:ring-2
                  focus:ring-gray-900
                  focus:ring-offset-2

                  dark:bg-white
                  dark:text-gray-900
                  dark:hover:bg-gray-200
                  dark:focus:ring-white
                  dark:focus:ring-offset-gray-900
                "
              >
                Explore Projects
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}