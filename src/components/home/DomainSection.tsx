import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";

const DOMAIN_DATA: Record<
  string,
  { icon: string; description: string; gradient: string }
> = {
  "Web Development": {
    icon: "💻",
    description: "Frontend apps, full-stack starters, component libraries",
    gradient: "from-blue-500/10 hover:border-blue-300 dark:from-blue-500/15",
  },
  Backend: {
    icon: "⚙️",
    description: "APIs, database engines, distributed microservices",
    gradient: "from-emerald-500/10 hover:border-emerald-300 dark:from-emerald-500/15",
  },
  "AI/ML": {
    icon: "🤖",
    description: "LLMs, neural networks, computer vision, AI agents",
    gradient: "from-purple-500/10 hover:border-purple-300 dark:from-purple-500/15",
  },
  Mobile: {
    icon: "📱",
    description: "React Native, Flutter, Swift, Kotlin native apps",
    gradient: "from-rose-500/10 hover:border-rose-300 dark:from-rose-500/15",
  },
  DevOps: {
    icon: "🛠️",
    description: "CI/CD pipelines, container orchestration, cloud infra",
    gradient: "from-amber-500/10 hover:border-amber-300 dark:from-amber-500/15",
  },
  Security: {
    icon: "🛡️",
    description: "Authentication, vulnerability scanners, cryptography",
    gradient: "from-cyan-500/10 hover:border-cyan-300 dark:from-cyan-500/15",
  },
};

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
    12
  );

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24"
      aria-labelledby="explore-heading"
    >
      <ScrollReveal>
        <SectionHeader
          eyebrow="Browse by Category"
          title="Popular Domains & Technologies"
          description="Explore projects grouped by your specialty or desired learning path."
          className="text-center sm:mx-auto sm:max-w-2xl sm:justify-center"
        />
      </ScrollReveal>

      {/* Domain Cards Grid */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topDomains.map(({ name, count }, index) => {
          const info = DOMAIN_DATA[name] || {
            icon: "🏷️",
            description: "Curated open source tools and frameworks",
            gradient: "from-gray-500/10 hover:border-gray-300",
          };

          return (
            <ScrollReveal key={name} delay={index * 60}>
              <Link
                href={`/projects?domain=${encodeURIComponent(name)}`}
                className={`
                  group relative flex flex-col justify-between rounded-2xl border border-gray-200/90
                  bg-gradient-to-br ${info.gradient} bg-white p-6 shadow-2xs transition-all
                  duration-200 hover:-translate-y-1 hover:shadow-md
                  dark:border-gray-800/90 dark:bg-gray-900
                `}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl transition-transform duration-200 group-hover:scale-110">
                      {info.icon}
                    </span>
                    <Badge variant="default" size="sm" className="font-semibold">
                      {count} {count === 1 ? "project" : "projects"}
                    </Badge>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {name}
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    {info.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors group-hover:translate-x-1 dark:text-blue-400">
                  <span>Explore {name}</span>
                  <span>→</span>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Popular Technology Cloud */}
      <ScrollReveal delay={120} className="mt-16 text-center">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Popular Technologies
        </h4>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {topTechnologies.map(({ name, count }) => (
            <Link
              key={name}
              href={`/projects?technology=${encodeURIComponent(name)}`}
              className="
                inline-flex items-center gap-1.5 rounded-xl border border-gray-200
                bg-white px-3.5 py-2 text-xs font-medium text-gray-700 shadow-2xs
                transition-all duration-150 hover:border-blue-400 hover:bg-blue-50
                hover:text-blue-700 hover:scale-105
                dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300
                dark:hover:border-blue-600 dark:hover:bg-blue-950/60 dark:hover:text-blue-300
              "
            >
              <span>{name}</span>
              <span className="rounded-md bg-gray-100 px-1.5 py-0.2 font-mono text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default DomainSection;
