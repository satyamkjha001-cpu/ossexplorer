import Card from "@/components/ui/Card";
import ReadmeRenderer from "@/components/project/ReadmeRenderer";

type ReadmeSectionProps = {
  readme: string | null;
  githubUrl: string;
  defaultBranch: string;
};

export default function ReadmeSection({
  readme,
  githubUrl,
  defaultBranch,
}: ReadmeSectionProps) {
  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Documentation
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        Repository README
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500 dark:text-gray-400">
        This README is retrieved from the
        project's GitHub repository. It can
        contain the project's actual purpose,
        features, installation instructions,
        usage examples, architecture,
        contribution instructions, and other
        documentation provided by its maintainers.
      </p>

      <div className="mt-6">
        <ReadmeRenderer
          readme={readme}
          githubUrl={githubUrl}
          defaultBranch={defaultBranch}
        />
      </div>
    </Card>
  );
}