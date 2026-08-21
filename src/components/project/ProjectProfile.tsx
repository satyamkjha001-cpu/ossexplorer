import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import DifficultyBadge from "@/components/project/DifficultyBadge";

import type { Project } from "@/data/projects";

import { formatDateAdded } from "@/lib/format";

type ProjectProfileProps = {
  project: Project;
};

export default function ProjectProfile({
  project,
}: ProjectProfileProps) {
  const technologyCount =
    project.technologies.length;

  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Project Profile
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        Project information
      </h2>

      <div
        className="
          mt-6
          divide-y
          divide-gray-200
          dark:divide-gray-800
        "
      >
        {/* Domain */}

        <div
          className="
            flex
            flex-col
            gap-1
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Domain
          </span>

          <span className="font-semibold text-gray-900 dark:text-white">
            {project.domain}
          </span>
        </div>

        {/* Difficulty */}

        <div
          className="
            flex
            flex-col
            gap-2
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Difficulty
          </span>

          <DifficultyBadge
            difficulty={project.difficulty}
          />
        </div>

        {/* Technology count */}

        <div
          className="
            flex
            flex-col
            gap-1
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Technologies
          </span>

          <span className="font-semibold text-gray-900 dark:text-white">
            {technologyCount}
          </span>
        </div>

        {/* Beginner */}

        <div
          className="
            flex
            flex-col
            gap-2
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Beginner friendly
          </span>

          {project.beginnerFriendly ? (
            <Badge variant="success">
              Yes
            </Badge>
          ) : (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              No
            </span>
          )}
        </div>

        {/* Good First Issue */}

        <div
          className="
            flex
            flex-col
            gap-2
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Good first issue
          </span>

          {project.goodFirstIssue ? (
            <Badge variant="info">
              Available
            </Badge>
          ) : (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Not listed
            </span>
          )}
        </div>

        {/* Added */}

        <div
          className="
            flex
            flex-col
            gap-1
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Added to Explorer
          </span>

          <span className="font-semibold text-gray-900 dark:text-white">
            {formatDateAdded(
              project.dateAdded
            )}
          </span>
        </div>
      </div>
    </Card>
  );
}