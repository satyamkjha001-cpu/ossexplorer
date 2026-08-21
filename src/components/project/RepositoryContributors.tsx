"use client";

import type { GitHubContributor } from "@/lib/github";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type RepositoryContributorsProps = {
  contributors: GitHubContributor[] | null;
};

export default function RepositoryContributors({
  contributors,
}: RepositoryContributorsProps) {
  if (!contributors || contributors.length === 0) {
    return (
      <Card
        padding="lg"
        className="rounded-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Contributors
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          Project contributors
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
          No contributor information is
          currently available for this repository.
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
            Contributors
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            Project contributors
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            The most active contributors returned
            by GitHub for this repository.
          </p>
        </div>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          Top {contributors.length}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contributors.map((contributor) => (
          <article
            key={contributor.id}
            className="
              rounded-xl
              border
              border-gray-200
              p-4
              dark:border-gray-800
            "
          >
            <div className="flex items-center gap-3">
              <img
                src={contributor.avatar_url}
                alt={`${contributor.login} avatar`}
                className="
                  h-11
                  w-11
                  rounded-full
                  object-cover
                "
              />

              <div className="min-w-0">
                <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                  {contributor.login}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {contributor.contributions}{" "}
                  contributions
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Button
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="w-full"
              >
                View GitHub profile →
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}