import Link from "next/link";

import BookmarkButton from "@/components/project/BookmarkButton";
import DifficultyBadge from "@/components/project/DifficultyBadge";
import ProjectMeta from "@/components/project/ProjectMeta";
import TechnologyTags from "@/components/project/TechnologyTags";
import HighlightText from "@/components/ui/HighlightText";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card, {
  CardDivider,
  CardFooter,
} from "@/components/ui/Card";

import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  searchQuery?: string;
};

const ProjectCard = ({
  project,
  searchQuery = "",
}: ProjectCardProps) => {
  const projectHref = `/projects/${project.id}`;

  return (
    <Card
      hover
      className="
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        transition-all
        duration-200
        hover:shadow-md
      "
    >
      <Link
        href={projectHref}
        className="
          absolute
          inset-0
          z-0
          rounded-xl
        "
        aria-label={`View ${project.name}`}
      />

      <div
        className="
          relative
          z-10
          flex
          flex-1
          flex-col
          pointer-events-none
        "
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p
              className="
                truncate
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-gray-500
                dark:text-gray-400
              "
            >
              <HighlightText text={project.domain} query={searchQuery} />
            </p>

            <h2
              className="
                mt-2
                line-clamp-2
                text-lg
                font-bold
                leading-7
                text-gray-900
                transition-colors
                group-hover:text-blue-600
                dark:text-white
                dark:group-hover:text-blue-400
                sm:text-xl
              "
            >
              <HighlightText text={project.name} query={searchQuery} />
            </h2>
          </div>

          <div className="shrink-0">
            <DifficultyBadge
              difficulty={project.difficulty}
              size="sm"
            />
          </div>
        </div>

        <p
          className="
            mt-4
            line-clamp-3
            min-h-[4.5rem]
            text-sm
            leading-6
            text-gray-600
            dark:text-gray-300
          "
        >
          <HighlightText text={project.description} query={searchQuery} />
        </p>

        <TechnologyTags
          technologies={project.technologies}
          searchQuery={searchQuery}
          maxVisible={4}
          className="mt-5"
        />

        <div
          className="
            mt-5
            flex
            min-h-7
            flex-wrap
            gap-2
          "
        >
          {project.beginnerFriendly && (
            <Badge variant="success">
              Beginner Friendly
            </Badge>
          )}

          {project.goodFirstIssue && (
            <Badge variant="info">
              Good First Issue
            </Badge>
          )}
        </div>
      </div>

      <CardFooter
        className="
          relative
          z-10
          pointer-events-auto
        "
      >
        <CardDivider>
          <ProjectMeta
            stars={project.stars}
            dateAdded={project.dateAdded}
          />
        </CardDivider>

        <div
          className="
            mt-5
            flex
            flex-col
            gap-2
            sm:flex-row
          "
        >
          <Button
            href={projectHref}
            fullWidth
            className="
              min-h-11
              flex-1
              text-center
            "
          >
            View Project
          </Button>

          <BookmarkButton
            projectId={project.id}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
