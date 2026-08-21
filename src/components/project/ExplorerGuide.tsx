import Card from "@/components/ui/Card";

export default function ExplorerGuide() {
  const steps = [
    {
      title: "Understand the project",
      description:
        "Read the project description and README before looking at individual files.",
    },
    {
      title: "Understand the technology stack",
      description:
        "Identify technologies you already know and the ones you need to learn.",
    },
    {
      title: "Check repository health",
      description:
        "Look at stars, forks, issues, and recent repository activity to get context about the project.",
    },
    {
      title: "Read contribution information",
      description:
        "Look for CONTRIBUTING files, issue labels, and contribution guidelines in the repository.",
    },
    {
      title: "Explore the source code",
      description:
        "Once you understand the project, open the repository and inspect its structure and implementation.",
    },
  ];

  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Explorer Guide
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        How to explore this project
      </h2>

      <div className="mt-6 space-y-5">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex gap-4"
          >
            <span
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gray-100
                text-xs
                font-bold
                text-gray-700
                dark:bg-gray-800
                dark:text-gray-300
              "
            >
              {index + 1}
            </span>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}