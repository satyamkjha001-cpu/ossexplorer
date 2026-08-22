"use client";

import type { GitHubCommit } from "@/lib/github";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type RepositoryActivityProps = {
  commits: GitHubCommit[] | null;
};

function formatCommitDate(
  date: string | null | undefined
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

function getRelativeTime(
  date: string | null | undefined
): string {
  if (!date) {
    return "Unknown";
  }

  const timestamp =
    new Date(date).getTime();

  if (Number.isNaN(timestamp)) {
    return "Unknown";
  }

  const difference =
    Date.now() - timestamp;

  const days = Math.floor(
    difference /
      (1000 * 60 * 60 * 24)
  );

  if (days === 0) {
    return "Today";
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 30) {
    return `${days} days ago`;
  }

  const months = Math.floor(
    days / 30
  );

  if (months < 12) {
    return `${months} ${
      months === 1
        ? "month"
        : "months"
    } ago`;
  }

  const years = Math.floor(
    months / 12
  );

  return `${years} ${
    years === 1
      ? "year"
      : "years"
  } ago`;
}

function getCommitAuthor(
  commit: GitHubCommit
): string {
  return (
    commit.author?.login ||
    commit.commit.author?.name ||
    commit.commit.committer?.name ||
    "Unknown contributor"
  );
}

function getCommitMessage(
  message: string
): string {
  return (
    message
      .split("\n")[0]
      ?.trim() ||
    "No commit message"
  );
}

export default function RepositoryActivity({
  commits,
}: RepositoryActivityProps) {
  if (!commits || commits.length === 0) {
    return (
      <Card
        padding="lg"
        className="rounded-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Repository Activity
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          Recent activity
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Recent commit activity could not
          be retrieved from GitHub.
        </p>
      </Card>
    );
  }

  const latestCommit = commits[0];

  const latestDate =
    latestCommit.commit.author?.date ||
    latestCommit.commit.committer?.date ||
    null;

  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Repository Activity
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        Recent activity
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500 dark:text-gray-400">
        Recent commits from the project&apos;s
        GitHub repository.
      </p>

      {/* Latest commit */}

      <div
        className="
          mt-6
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          p-5
          dark:border-gray-800
          dark:bg-gray-800/50
        "
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Latest commit
            </p>

            <h3 className="mt-2 break-words text-base font-semibold text-gray-900 dark:text-white">
              {getCommitMessage(
                latestCommit.commit.message
              )}
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              by{" "}
              <span className="font-medium">
                {getCommitAuthor(
                  latestCommit
                )}
              </span>
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {formatCommitDate(
                latestDate
              )}{" "}
              ·{" "}
              {getRelativeTime(
                latestDate
              )}
            </p>
          </div>

          <Button
            href={
              latestCommit.html_url
            }
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="shrink-0"
          >
            View commit →
          </Button>
        </div>
      </div>

      {/* Recent commits */}

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Recent commits
          </h3>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {commits.length} loaded
          </span>
        </div>

        <div className="mt-3 divide-y divide-gray-200 rounded-xl border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
          {commits.map(
            (commit) => {
              const date =
                commit.commit.author
                  ?.date ||
                commit.commit
                  .committer?.date ||
                null;

              return (
                <a
                  key={commit.sha}
                  href={
                    commit.html_url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    block
                    p-4
                    transition
                    hover:bg-gray-50
                    dark:hover:bg-gray-800/50
                  "
                >
                  <div className="flex gap-4">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gray-400" />

                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-medium text-gray-900 dark:text-white">
                        {getCommitMessage(
                          commit.commit
                            .message
                        )}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          {getCommitAuthor(
                            commit
                          )}
                        </span>

                        <span>·</span>

                        <span>
                          {formatCommitDate(
                            date
                          )}
                        </span>

                        <span>·</span>

                        <span>
                          {getRelativeTime(
                            date
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            }
          )}
        </div>
      </div>
    </Card>
  );
}