import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

import type {
  RepositoryInsights,
} from "@/lib/githubProjectInsights";

import type {
  GitHubRepository,
} from "@/lib/github";

type RepositoryHealthProps = {
  repository: GitHubRepository;
  insights: RepositoryInsights;
};

function formatGitHubDate(
  date: string | null
): string {
  if (!date) {
    return "Unknown";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown";
  }

  return parsedDate.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

export default function RepositoryHealth({
  repository,
  insights,
}: RepositoryHealthProps) {
  const activityVariant =
    insights.activity === "active"
      ? "success"
      : insights.activity === "recent"
        ? "info"
        : insights.activity === "stale"
          ? "warning"
          : undefined;

  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Repository Health
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            How is this repository doing?
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            These signals are calculated from live GitHub
            repository metadata. They describe activity and
            repository configuration, not overall project quality.
          </p>
        </div>

        <Badge variant={activityVariant}>
          {insights.activityLabel}
        </Badge>
      </div>

      {/* ========================================
          SUMMARY
      ======================================== */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-800/50">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Activity
          </p>

          <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
            {insights.activityLabel}
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {insights.activityDescription}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-800/50">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Repository State
          </p>

          <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
            {insights.repositoryStatus.label}
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {insights.repositoryStatus.description}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-800/50">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Maintenance
          </p>

          <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
            {insights.maintenanceLabel}
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
            Last push:{" "}
            {formatGitHubDate(repository.pushed_at)}
          </p>
        </div>
      </div>

      {/* ========================================
          REPOSITORY CAPABILITIES
      ======================================== */}

      <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Repository capabilities
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge
            variant={
              insights.hasIssues
                ? "success"
                : undefined
            }
          >
            {insights.hasIssues
              ? "Issues enabled"
              : "Issues disabled"}
          </Badge>

          <Badge
            variant={
              insights.hasPullRequests
                ? "success"
                : undefined
            }
          >
            {insights.hasPullRequests
              ? "Pull requests enabled"
              : "Pull requests disabled"}
          </Badge>

          <Badge
            variant={
              insights.hasDiscussions
                ? "info"
                : undefined
            }
          >
            {insights.hasDiscussions
              ? "Discussions enabled"
              : "Discussions disabled"}
          </Badge>

          {insights.isTemplate && (
            <Badge variant="info">
              GitHub template
            </Badge>
          )}

          {insights.isFork && (
            <Badge variant="info">
              Fork
            </Badge>
          )}

          {insights.isArchived && (
            <Badge variant="warning">
              Archived
            </Badge>
          )}
        </div>
      </div>

      {/* ========================================
          COMMUNITY SIGNALS
      ======================================== */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Community signals
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Based on stars, forks, issues,
              discussions, and pull requests.
            </p>
          </div>

          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {insights.communityScore}/7 signals
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className="h-full rounded-full bg-gray-900 transition-all dark:bg-gray-100"
            style={{
              width: `${Math.round(
                (insights.communityScore / 7) *
                  100
              )}%`,
            }}
          />
        </div>

        <p className="mt-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
          This is a simple activity/community
          indicator, not a rating of project quality,
          security, or maintainability.
        </p>
      </div>
    </Card>
  );
}