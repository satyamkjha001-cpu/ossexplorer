import ProjectCard from "@/components/project/ProjectCard";
import { ProjectGridSkeleton } from "@/components/ui/Loading";
import { cn } from "@/lib/cn";

import type { Project } from "@/data/projects";

type ProjectGridProps = {
  projects: Project[];
  searchQuery?: string;
  loading?: boolean;
  skeletonCount?: number;
  className?: string;
};

export default function ProjectGrid({
  projects,
  searchQuery = "",
  loading = false,
  skeletonCount = 6,
  className,
}: ProjectGridProps) {
  if (loading) {
    return <ProjectGridSkeleton count={skeletonCount} />;
  }

  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}
