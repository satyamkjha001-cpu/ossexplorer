import Card from "@/components/ui/Card";

import type { Project } from "@/data/projects";

type ProjectOverviewProps = {
  project: Project;
  repositoryDescription?: string | null;
};

export default function ProjectOverview({
  project,
  repositoryDescription,
}: ProjectOverviewProps) {
  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Overview
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        What is {project.name}?
      </h2>

      <p className="mt-4 max-w-4xl text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
        {repositoryDescription ||
          project.description}
      </p>

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
        <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
          This project belongs to the{" "}
          <strong className="text-gray-900 dark:text-white">
            {project.domain}
          </strong>{" "}
          domain and is classified as{" "}
          <strong className="text-gray-900 dark:text-white">
            {project.difficulty}
          </strong>
          .
        </p>
      </div>
    </Card>
  );
}