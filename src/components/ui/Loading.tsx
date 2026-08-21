import { cn } from "@/lib/cn";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        `
          rounded-lg bg-gray-200 dark:bg-gray-800
          motion-safe:animate-shimmer
          motion-safe:bg-[length:200%_100%]
          motion-safe:bg-gradient-to-r
          motion-safe:from-gray-200 motion-safe:via-gray-100 motion-safe:to-gray-200
          dark:motion-safe:from-gray-800 dark:motion-safe:via-gray-700 dark:motion-safe:to-gray-800
        `,
        className
      )}
      aria-hidden="true"
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div
      className="
        flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm
        dark:border-gray-800 dark:bg-gray-900 sm:p-6
      "
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <Skeleton className="h-7 w-20 rounded-full" />
      </div>

      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="mt-5 flex gap-2">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-14 rounded-md" />
      </div>

      <div className="mt-auto pt-6">
        <Skeleton className="h-px w-full" />
        <div className="mt-4 flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="mt-5 flex gap-2">
          <Skeleton className="h-11 flex-1 rounded-lg" />
          <Skeleton className="h-11 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

type ProjectGridSkeletonProps = {
  count?: number;
};

export function ProjectGridSkeleton({ count = 6 }: ProjectGridSkeletonProps) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading projects"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ProjectsPageSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-3 h-10 w-64" />
      <Skeleton className="mt-3 h-5 w-96 max-w-full" />

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <Skeleton className="h-12 w-full rounded-xl" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </div>

      <Skeleton className="mt-6 h-5 w-32" />
      <div className="mt-5">
        <ProjectGridSkeleton count={6} />
      </div>
    </section>
  );
}
