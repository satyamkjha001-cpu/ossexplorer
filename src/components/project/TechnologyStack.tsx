import Card from "@/components/ui/Card";
import TechnologyTags from "@/components/project/TechnologyTags";

type TechnologyStackProps = {
  technologies: string[];
};

export default function TechnologyStack({
  technologies,
}: TechnologyStackProps) {
  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Technology Stack
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        Technologies used
      </h2>

      <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
        {technologies.length} technologies are
        currently associated with this project
        in the Explorer.
      </p>

      <TechnologyTags
        technologies={technologies}
        size="md"
        className="mt-5"
      />
    </Card>
  );
}