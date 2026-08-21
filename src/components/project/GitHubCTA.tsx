import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type GitHubCTAProps = {
  githubUrl: string;
};

export default function GitHubCTA({
  githubUrl,
}: GitHubCTAProps) {
  return (
    <Card
      padding="lg"
      className="
        rounded-2xl
        border-gray-900
        bg-gray-900
        dark:border-gray-700
        dark:bg-gray-900
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Official Repository
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Ready to explore the code?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
            The Explorer gives you project context.
            GitHub gives you the actual source code,
            issues, documentation, and contribution
            workflow.
          </p>
        </div>

        <Button
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            min-h-11
            w-full
            shrink-0
            sm:w-auto
          "
        >
          Open Repository →
        </Button>
      </div>
    </Card>
  );
}