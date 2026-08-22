import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";

const STAT_CONFIGS = [
  {
    key: "projects",
    label: "Curated Projects",
    icon: "📦",
    bgGradient: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20",
    textGradient: "text-blue-600 dark:text-blue-400",
  },
  {
    key: "domains",
    label: "Active Domains",
    icon: "🌐",
    bgGradient: "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20",
    textGradient: "text-purple-600 dark:text-purple-400",
  },
  {
    key: "tech",
    label: "Tech Stacks",
    icon: "⚡",
    bgGradient: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20",
    textGradient: "text-amber-600 dark:text-amber-400",
  },
  {
    key: "beginner",
    label: "Beginner Friendly",
    icon: "🌱",
    bgGradient: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20",
    textGradient: "text-emerald-600 dark:text-emerald-400",
  },
];

const ProjectStats = () => {
  const totalProjects = projects.length;
  const totalDomains = new Set(projects.map((p) => p.domain)).size;
  const totalTechnologies = new Set(projects.flatMap((p) => p.technologies)).size;
  const beginnerFriendlyCount = projects.filter((p) => p.beginnerFriendly).length;

  const statValues: Record<string, string> = {
    projects: totalProjects.toLocaleString(),
    domains: totalDomains.toLocaleString(),
    tech: totalTechnologies.toLocaleString(),
    beginner: beginnerFriendlyCount.toLocaleString(),
  };

  return (
    <section
      className="border-y border-gray-200/80 bg-white/50 py-16 backdrop-blur-xs dark:border-gray-800/80 dark:bg-gray-900/30 lg:py-20"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Ecosystem Scale"
            title="By the Numbers"
            description="Explore an expansive catalogue of battle-tested open-source repositories."
            className="text-center sm:mx-auto sm:max-w-2xl sm:justify-center"
          />
        </ScrollReveal>

        <dl className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STAT_CONFIGS.map((stat, index) => (
            <ScrollReveal key={stat.key} delay={index * 75}>
              <div
                className="
                  group relative flex flex-col items-center rounded-2xl border border-gray-200/90
                  bg-white/80 p-6 text-center shadow-xs transition-all duration-200
                  hover:-translate-y-1 hover:border-gray-300 hover:shadow-md
                  dark:border-gray-800/90 dark:bg-gray-900/80 dark:hover:border-gray-700
                "
              >
                <div
                  className={`
                    flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br
                    ${stat.bgGradient} text-2xl shadow-2xs transition-transform duration-200
                    group-hover:scale-110
                  `}
                >
                  {stat.icon}
                </div>

                <dd
                  className={`mt-4 text-3xl font-extrabold tabular-nums tracking-tight sm:text-4xl ${stat.textGradient}`}
                >
                  {statValues[stat.key]}
                </dd>

                <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {stat.label}
                </dt>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default ProjectStats;
