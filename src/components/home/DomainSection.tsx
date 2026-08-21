import Link from "next/link";

import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";

function getTopItems(
  items: string[],
  limit: number
): { name: string; count: number }[] {
  const counts = new Map<string, number>();

  for (const item of items) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

const DomainSection = () => {
  const topDomains = getTopItems(
    projects.map((project) => project.domain),
    6
  );

  const topTechnologies = getTopItems(
    projects.flatMap((project) => project.technologies),
    10
  );

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16"
      aria-labelledby="explore-heading"
    >
      <ScrollReveal>
        <SectionHeader
          eyebrow="Browse by Category"
          title="Popular Domains & Technologies"
          description="Jump straight into projects that match your interests."
          className="text-center sm:mx-auto sm:max-w-2xl sm:justify-center"
        />
      </ScrollReveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <ScrollReveal delay={80}>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100">
              Domains
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {topDomains.map(({ name, count }) => (
                <li key={name}>
                  <Link
                    href={`/projects?domain=${encodeURIComponent(name)}`}
                    className="
                      inline-flex min-h-10 items-center gap-2 rounded-full
                      border border-gray-200 bg-white px-4 py-2
                      text-sm font-medium text-gray-700 transition-all duration-150
                      hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                      dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200
                      dark:hover:border-gray-600 dark:hover:bg-gray-800
                      dark:focus:ring-white dark:focus:ring-offset-gray-950
                    "
                  >
                    {name}
                    <Badge variant="default" size="sm">
                      {count}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100">
              Technologies
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {topTechnologies.map(({ name, count }) => (
                <li key={name}>
                  <Link
                    href={`/projects?technology=${encodeURIComponent(name)}`}
                    className="
                      inline-flex min-h-10 items-center gap-2 rounded-md
                      bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700
                      transition-all duration-150 hover:bg-gray-200
                      focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                      dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700
                      dark:focus:ring-white dark:focus:ring-offset-gray-950
                    "
                  >
                    {name}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({count})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DomainSection;
