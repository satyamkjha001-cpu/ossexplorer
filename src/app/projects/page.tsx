import { Suspense } from "react";

import ProjectsContent from "./ProjectsContent";

function ProjectsLoading() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {/* Header skeleton */}
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="mt-3 h-10 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />

        <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        {/* Search skeleton */}
        <div className="mt-8 h-14 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />

        {/* Filter skeleton */}
        <div className="mt-5 h-32 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />

        {/* Cards skeleton */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-80 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsContent />
    </Suspense>
  );
}