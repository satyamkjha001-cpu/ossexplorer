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

function getActivityIndicator(
  activity: RepositoryInsights["activity"]
) {
  if (activity === "active") {
    return "bg-green-500";
  }

  if (activity === "recent") {
    return "bg-blue-500";
  }

  if (activity === "stale") {
    return "bg-amber-500";
  }

  return "bg-gray-400";
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

  const activityIndicator =
    getActivityIndicator(
      insights.activity
    );

  return (
    <Card
      padding="lg"
      className="
        overflow-hidden
        rounded-2xl
      "
    >
      {/* ========================================
          HEADER
      ======================================== */}

      <div
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-gray-100
                text-gray-700
                dark:bg-gray-800
                dark:text-gray-300
              "
              aria-hidden="true"
            >
              <span
                className={`
                  h-2.5
                  w-2.5
                  rounded-full
                  ${activityIndicator}
                `}
              />
            </span>

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-gray-500
                dark:text-gray-400
              "
            >
              Repository Health
            </p>
          </div>

          <h2
            className="
              mt-3
              text-2xl
              font-bold
              tracking-tight
              text-gray-900
              dark:text-white
            "
          >
            How is this repository doing?
          </h2>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-gray-500
              dark:text-gray-400
            "
          >
            A quick view of repository activity,
            maintenance, and GitHub configuration.
          </p>
        </div>

        <div className="shrink-0">
          <Badge variant={activityVariant}>
            {insights.activityLabel}
          </Badge>
        </div>
      </div>

      {/* ========================================
          HEALTH SUMMARY
      ======================================== */}

      <div
        className="
          mt-7
          grid
          gap-3
        "
      >
        {/* Activity */}

        <div
          className="
            group
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            p-5
            transition-colors
            dark:border-gray-800
            dark:bg-gray-800/40
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Activity
              </p>

              <p
                className="
                  mt-2
                  break-words
                  text-lg
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                {insights.activityLabel}
              </p>
            </div>

            <span
              className={`
                mt-1
                h-2.5
                w-2.5
                shrink-0
                rounded-full
                ${activityIndicator}
              `}
            />
          </div>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-gray-600
              dark:text-gray-300
            "
          >
            {insights.activityDescription}
          </p>
        </div>

        {/* Repository State */}

        <div
          className="
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            p-5
            dark:border-gray-800
            dark:bg-gray-800/40
          "
        >
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-gray-500
              dark:text-gray-400
            "
          >
            Repository State
          </p>

          <p
            className="
              mt-2
              break-words
              text-lg
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            {insights.repositoryStatus.label}
          </p>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-gray-600
              dark:text-gray-300
            "
          >
            {insights.repositoryStatus.description}
          </p>
        </div>

        {/* Maintenance */}

        <div
          className="
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            p-5
            dark:border-gray-800
            dark:bg-gray-800/40
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Maintenance
              </p>

              <p
                className="
                  mt-2
                  break-words
                  text-lg
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                {insights.maintenanceLabel}
              </p>
            </div>
          </div>

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              gap-4
              border-t
              border-gray-200
              pt-3
              dark:border-gray-700
            "
          >
            <span
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              Last push
            </span>

            <span
              className="
                text-right
                text-sm
                font-medium
                text-gray-700
                dark:text-gray-200
              "
            >
              {formatGitHubDate(
                repository.pushed_at
              )}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================
          REPOSITORY CAPABILITIES
      ======================================== */}

      <div
        className="
          mt-7
          border-t
          border-gray-200
          pt-6
          dark:border-gray-800
        "
      >
        <div>
          <p
            className="
              text-sm
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            Repository capabilities
          </p>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Features currently enabled on GitHub.
          </p>
        </div>

        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-2
          "
        >
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

      <div
        className="
          mt-6
          rounded-xl
          border
          border-gray-200
          bg-white
          p-5
          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-sm
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              Community signals
            </p>

            <p
              className="
                mt-1
                text-sm
                leading-6
                text-gray-500
                dark:text-gray-400
              "
            >
              Based on stars, forks, issues,
              discussions, and pull requests.
            </p>
          </div>

          <div
            className="
              shrink-0
              rounded-lg
              bg-gray-100
              px-3
              py-2
              text-sm
              font-semibold
              text-gray-900
              dark:bg-gray-800
              dark:text-white
            "
          >
            {insights.communityScore}/7
          </div>
        </div>

        <div
          className="
            mt-5
            h-2
            overflow-hidden
            rounded-full
            bg-gray-100
            dark:bg-gray-800
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-gray-900
              transition-all
              dark:bg-gray-100
            "
            style={{
              width: `${Math.round(
                (insights.communityScore / 7) *
                  100
              )}%`,
            }}
          />
        </div>

        <div
          className="
            mt-3
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <p
            className="
              text-xs
              leading-5
              text-gray-500
              dark:text-gray-400
            "
          >
            This is a simple activity/community
            indicator, not a rating of project
            quality, security, or maintainability.
          </p>

          <span
            className="
              shrink-0
              text-xs
              font-medium
              text-gray-400
              dark:text-gray-500
            "
          >
            {Math.round(
              (insights.communityScore / 7) *
                100
            )}
          </span>
        </div>
      </div>
    </Card>
  );
}