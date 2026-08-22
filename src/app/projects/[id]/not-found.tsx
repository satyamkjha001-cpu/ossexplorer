import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-200 dark:bg-gray-950 dark:text-gray-100">
      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-3xl items-center justify-center px-6 py-16">
        <div className="w-full text-center">
          {/* Icon */}

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
            <span
              className="text-2xl text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            >
              ?
            </span>
          </div>

          {/* Heading */}

          <p className="mt-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            404
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Project Not Found
          </h1>

          {/* Description */}

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
            The project you&apos;re looking for doesn&apos;t
            exist or may have been removed from
            the collection.
          </p>

          {/* Actions */}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="
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
                dark:focus:ring-offset-gray-950
              "
            >
              ← Back to Projects
            </Link>

            <Link
              href="/"
              className="
                rounded-lg
                border
                border-gray-300
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-gray-700
                transition-colors
                hover:bg-gray-100

                focus:outline-none
                focus:ring-2
                focus:ring-gray-900
                focus:ring-offset-2

                dark:border-gray-700
                dark:bg-gray-900
                dark:text-gray-200
                dark:hover:bg-gray-800
                dark:focus:ring-white
                dark:focus:ring-offset-gray-950
              "
            >
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}