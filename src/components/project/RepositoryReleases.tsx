"use client";

import type { GitHubRelease } from "@/lib/github";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type RepositoryReleasesProps = {
  releases: GitHubRelease[] | null;
};

function formatReleaseDate(
  date: string | null
): string {
  if (!date) {
    return "Unknown date";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Unknown date";
  }

  return parsed.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

function getReleaseTitle(
  release: GitHubRelease
): string {
  return (
    release.name?.trim() ||
    release.tag_name
  );
}

function getReleaseDescription(
  body: string | null
): string {
  if (!body?.trim()) {
    return "No release description was provided.";
  }

  const cleaned = body
    .replace(/[#*_>`]/g, "")
    .replace(/\r?\n+/g, " ")
    .trim();

  if (cleaned.length <= 220) {
    return cleaned;
  }

  return `${cleaned.slice(0, 220).trim()}…`;
}

export default function RepositoryReleases({
  releases,
}: RepositoryReleasesProps) {
  if (!releases || releases.length === 0) {
    return (
      <Card
        padding="lg"
        className="rounded-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Releases
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          Project releases
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
          No published GitHub releases were
          found for this repository.
        </p>
      </Card>
    );
  }

  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Releases
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            Project releases
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Recent published releases from
            the project's GitHub repository.
          </p>
        </div>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {releases.length} loaded
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {releases.map((release) => (
          <article
            key={release.id}
            className="
              rounded-xl
              border
              border-gray-200
              p-5
              dark:border-gray-800
            "
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {getReleaseTitle(
                      release
                    )}
                  </h3>

                  <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    {release.tag_name}
                  </span>

                  {release.prerelease && (
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      Pre-release
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {getReleaseDescription(
                    release.body
                  )}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    Published{" "}
                    {formatReleaseDate(
                      release.published_at
                    )}
                  </span>

                  {release.author?.login && (
                    <>
                      <span>·</span>

                      <span>
                        by{" "}
                        {release.author.login}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <Button
                href={release.html_url}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="shrink-0"
              >
                View release →
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}