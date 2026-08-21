import ProjectCard from "@/components/project/ProjectCard";
import { ProjectGridSkeleton } from "@/components/ui/Loading";

import type { Project } from "@/data/projects";

type ProjectGridProps = {
  projects: Project[];
  loading?: boolean;
  skeletonCount?: number;
  className?: string;
};

export default function ProjectGrid({
  projects,
  loading = false,
  skeletonCount = 6,
}: ProjectGridProps) {
  if (loading) {
    return <ProjectGridSkeleton count={skeletonCount} />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
