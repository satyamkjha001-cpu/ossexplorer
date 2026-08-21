import StarCount from "@/components/project/StarCount";
import { formatDateAdded } from "@/lib/format";

type ProjectMetaProps = {
  stars: number;
  dateAdded: string;
};

export default function ProjectMeta({ stars, dateAdded }: ProjectMetaProps) {
  return (
    <div className="flex items-center justify-between">
      <StarCount stars={stars} />

      <span className="text-xs text-gray-500 dark:text-gray-400">
        Added {formatDateAdded(dateAdded)}
      </span>
    </div>
  );
}
