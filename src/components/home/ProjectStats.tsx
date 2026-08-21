import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";

const ProjectStats = () => {
  const totalProjects = projects.length;

  const totalDomains = new Set(
    projects.map((project) => project.domain)
  ).size;

  const totalTechnologies = new Set(
    projects.flatMap((project) => project.technologies)
  ).size;

  const beginnerFriendlyCount = projects.filter(
    (project) => project.beginnerFriendly
  ).length;

  const stats = [
    { label: "Projects", value: totalProjects.toLocaleString() },
    { label: "Domains", value: totalDomains.toLocaleString() },
    { label: "Technologies", value: totalTechnologies.toLocaleString() },
    {
      label: "Beginner Friendly",
      value: beginnerFriendlyCount.toLocaleString(),
    },
  ];

  return (
    <section
      className="border-y border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <ScrollReveal>
          <SectionHeader
            eyebrow="By the Numbers"
            title="Project Statistics"
            className="text-center sm:items-center sm:justify-center"
          />
        </ScrollReveal>

        <dl className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 80}>
              <div
                className="
                  rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm
                  dark:border-gray-800 dark:bg-gray-900
                "
              >
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-2xl font-bold tabular-nums text-gray-900 dark:text-white sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default ProjectStats;
