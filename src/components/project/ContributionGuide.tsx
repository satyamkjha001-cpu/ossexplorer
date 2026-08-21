import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

import type { Project } from "@/data/projects";

type ContributionGuideProps = {
  project: Project;
};

export default function ContributionGuide({
  project,
}: ContributionGuideProps) {
  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Open Source
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        Contribution potential
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-500 dark:text-gray-400">
        These are signals stored in the Explorer
        dataset. Always verify current GitHub
        issues and contribution guidelines before
        contributing.
      </p>

      <div
        className="
          mt-6
          grid
          gap-4
          sm:grid-cols-2
        "
      >
        {/* Beginner Friendly */}

        <div
          className="
            rounded-xl
            border
            border-gray-200
            p-5
            dark:border-gray-800
          "
        >
          {project.beginnerFriendly ? (
            <>
              <Badge variant="success">
                Beginner Friendly
              </Badge>

              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                This project is marked as
                beginner friendly and may be
                a reasonable repository to
                study while building open
                source experience.
              </p>
            </>
          ) : (
            <>
              <Badge>
                Not Beginner Friendly
              </Badge>

              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                This project is not marked as
                beginner friendly. Understand
                the codebase and documentation
                before attempting a contribution.
              </p>
            </>
          )}
        </div>

        {/* Good First Issue */}

        <div
          className="
            rounded-xl
            border
            border-gray-200
            p-5
            dark:border-gray-800
          "
        >
          {project.goodFirstIssue ? (
            <>
              <Badge variant="info">
                Good First Issue
              </Badge>

              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                This project is marked as having
                good-first-issue opportunities.
                Check GitHub for the actual
                current issues.
              </p>
            </>
          ) : (
            <>
              <Badge>
                No Good First Issue Signal
              </Badge>

              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                No good-first-issue signal is
                currently stored in the Explorer.
              </p>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}