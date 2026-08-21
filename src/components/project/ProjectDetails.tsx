import BookmarkButton from "@/components/project/BookmarkButton";
import DifficultyBadge from "@/components/project/DifficultyBadge";
import ShareButton from "@/components/project/ShareButton";
import StarCount from "@/components/project/StarCount";
import TechnologyTags from "@/components/project/TechnologyTags";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import type { Project } from "@/data/projects";

type ProjectDetailsProps = {
  project: Project;
};

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const projectPath = `/projects/${project.id}`;

  return (
    <Card padding="lg" className="overflow-hidden rounded-2xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {project.domain}
          </p>

          <h1 className="mt-2 break-words text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {project.name}
          </h1>
        </div>

        <DifficultyBadge difficulty={project.difficulty} />
      </div>

      <p className="mt-6 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
        {project.description}
      </p>

      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100">
          Technologies
        </h2>

        <TechnologyTags
          technologies={project.technologies}
          size="md"
          className="mt-3"
        />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            GitHub Stars
          </p>
          <StarCount
            stars={project.stars}
            className="mt-1 text-xl font-semibold text-gray-900 dark:text-white"
          />
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Beginner Friendly
          </p>
          <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
            {project.beginnerFriendly ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
        <Button
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-11 w-full sm:w-auto"
        >
          View on GitHub
        </Button>

        <BookmarkButton projectId={project.id} />

        <ShareButton projectPath={projectPath} />

        <Button href="/projects" variant="secondary" className="min-h-11 w-full sm:w-auto">
          ← Back to Projects
        </Button>
      </div>
    </Card>
  );
};

export default ProjectDetails;
