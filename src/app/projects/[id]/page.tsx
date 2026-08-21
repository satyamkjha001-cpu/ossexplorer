import { notFound } from "next/navigation";

import ProjectDetails from "@/components/project/ProjectDetails";

import { projects } from "@/data/projects";

type ProjectDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;

  const project = projects.find(
    (project) =>
      project.id === Number(id)
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-950">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <ProjectDetails project={project} />
      </section>
    </main>
  );
}