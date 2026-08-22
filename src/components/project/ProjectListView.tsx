import Link from "next/link";
import BookmarkButton from "@/components/project/BookmarkButton";
import DifficultyBadge from "@/components/project/DifficultyBadge";
import TechnologyTags from "@/components/project/TechnologyTags";
import HighlightText from "@/components/ui/HighlightText";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Project } from "@/data/projects";

type ProjectListViewProps = {
  projects: Project[];
  searchQuery?: string;
};

export default function ProjectListView({
  projects,
  searchQuery = "",
}: ProjectListViewProps) {
  return (
    <div className="flex flex-col gap-3">
      {projects.map((project) => {
        const projectHref = `/projects/${project.id}`;

        return (
          <div
            key={project.id}
            className="
              group relative flex flex-col gap-3 rounded-2xl border border-gray-200
              bg-white p-4 shadow-2xs transition-all duration-200
              hover:border-gray-300 hover:shadow-md
              dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700
              sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5
            "
          >
            {/* Left Column: Name, Domain, Description, Tech */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <HighlightText text={project.domain} query={searchQuery} />
                </span>

                <Link
                  href={projectHref}
                  className="truncate text-base font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-lg"
                >
                  <HighlightText text={project.name} query={searchQuery} />
                </Link>

                <div className="flex items-center gap-1.5">
                  {project.beginnerFriendly && (
                    <Badge variant="success" size="sm">
                      Beginner
                    </Badge>
                  )}
                  {project.goodFirstIssue && (
                    <Badge variant="info" size="sm">
                      Good First Issue
                    </Badge>
                  )}
                </div>
              </div>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                <HighlightText text={project.description} query={searchQuery} />
              </p>

              <div className="mt-3">
                <TechnologyTags
                  technologies={project.technologies}
                  searchQuery={searchQuery}
                  maxVisible={6}
                />
              </div>
            </div>

            {/* Right Column: Meta & Actions */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-gray-100 pt-3 sm:border-0 sm:pt-0">
              <div className="flex flex-col sm:items-end gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
                    <span>★</span>
                    <span>{project.stars.toLocaleString()}</span>
                  </span>
                  <DifficultyBadge difficulty={project.difficulty} size="sm" />
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Added {project.dateAdded}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  href={projectHref}
                  size="sm"
                  className="min-h-9 px-4 font-medium"
                >
                  View
                </Button>
                <BookmarkButton projectId={project.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
