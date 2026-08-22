"use client";

import BookmarkButton from "@/components/project/BookmarkButton";
import ContributionGuide from "@/components/project/ContributionGuide";
import DifficultyBadge from "@/components/project/DifficultyBadge";
import ExplorerGuide from "@/components/project/ExplorerGuide";
import GitHubCTA from "@/components/project/GitHubCTA";
import LanguageBreakdown from "@/components/project/LanguageBreakdown";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectProfile from "@/components/project/ProjectProfile";
import ReadmeSection from "@/components/project/ReadmeSection";
import RepositoryActivity from "@/components/project/RepositoryActivity";
import RepositoryContributors from "@/components/project/RepositoryContributors";
import RepositoryHealth from "@/components/project/RepositoryHealth";
import RepositoryReleases from "@/components/project/RepositoryReleases";
import ShareButton from "@/components/project/ShareButton";
import TechnologyStack from "@/components/project/TechnologyStack";
import TechnologyTags from "@/components/project/TechnologyTags";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useGitHubProject } from "@/hooks/useGitHubProject";
import { getRepositoryInsights } from "@/lib/githubProjectInsights";

import type { Project } from "@/data/projects";
import type { GitHubRepository } from "@/lib/github";
import type { RepositoryInsights } from "@/lib/githubProjectInsights";

type ProjectDetailsProps = {
  project: Project;
};

function formatGitHubDate(
  date: string | null
) {
  if (!date) {
    return "Unknown";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  ).format(parsedDate);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function GitHubLoading() {
  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <div className="animate-pulse space-y-6">
        <div>
          <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-3 h-8 w-64 rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-24 rounded-xl bg-gray-200 dark:bg-gray-800"
              />
            )
          )}
        </div>
      </div>
    </Card>
  );
}

type HeroStatProps = {
  label: string;
  value: string;
};

function HeroStat({
  label,
  value,
}: HeroStatProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-gray-200
        bg-gray-50
        px-4
        py-3
        dark:border-gray-800
        dark:bg-gray-800/50
      "
    >
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

type RepositoryMetadataProps = {
  repository: GitHubRepository;
};

function RepositoryMetadata({
  repository,
}: RepositoryMetadataProps) {
  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        GitHub Statistics
      </p>

      <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
        Repository details
      </h2>

      <dl
        className="
          mt-5
          space-y-4
          text-sm
        "
      >
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Repository
          </dt>
          <dd className="mt-1 break-all font-medium text-gray-900 dark:text-white">
            {repository.full_name}
          </dd>
        </div>

        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            License
          </dt>
          <dd className="mt-1 font-medium text-gray-900 dark:text-white">
            {repository.license?.name ||
              "Not specified"}
          </dd>
        </div>

        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Primary language
          </dt>
          <dd className="mt-1 font-medium text-gray-900 dark:text-white">
            {repository.language ||
              "Not specified"}
          </dd>
        </div>

        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Default branch
          </dt>
          <dd className="mt-1 font-medium text-gray-900 dark:text-white">
            {repository.default_branch}
          </dd>
        </div>

        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Created
          </dt>
          <dd className="mt-1 font-medium text-gray-900 dark:text-white">
            {formatGitHubDate(
              repository.created_at
            )}
          </dd>
        </div>

        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Last updated
          </dt>
          <dd className="mt-1 font-medium text-gray-900 dark:text-white">
            {formatGitHubDate(
              repository.updated_at
            )}
          </dd>
        </div>

        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Last push
          </dt>
          <dd className="mt-1 font-medium text-gray-900 dark:text-white">
            {formatGitHubDate(
              repository.pushed_at
            )}
          </dd>
        </div>
      </dl>

      {repository.topics.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-5 dark:border-gray-800">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Topics
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {repository.topics.map(
              (topic) => (
                <span
                  key={topic}
                  className="
                    rounded-full
                    bg-gray-100
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-gray-700
                    dark:bg-gray-800
                    dark:text-gray-300
                  "
                >
                  #{topic}
                </span>
              )
            )}
          </div>
        </div>
      )}

      <a
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-6
          inline-block
          text-sm
          font-semibold
          text-blue-600
          hover:underline
          dark:text-blue-400
        "
      >
        View repository on GitHub →
      </a>
    </Card>
  );
}

type QuickActionsProps = {
  projectId: number;
  projectPath: string;
  githubUrl: string;
};

function QuickActions({
  projectId,
  projectPath,
  githubUrl,
}: QuickActionsProps) {
  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Quick actions
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <Button
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-11 w-full"
        >
          Open on GitHub →
        </Button>

        <BookmarkButton
          projectId={projectId}
        />

        <ShareButton
          projectPath={projectPath}
        />

        <Button
          href="/projects"
          variant="secondary"
          className="min-h-11 w-full"
        >
          ← Back to Projects
        </Button>
      </div>
    </Card>
  );
}

type ProjectHeroProps = {
  project: Project;
  projectPath: string;
  repository: GitHubRepository | null;
  repositoryInsights: RepositoryInsights | null;
  loading: boolean;
  githubUrl: string;
};

function ProjectHero({
  project,
  projectPath,
  repository,
  repositoryInsights,
  loading,
  githubUrl,
}: ProjectHeroProps) {
  const activityVariant =
    repositoryInsights?.activity ===
    "active"
      ? "success"
      : repositoryInsights?.activity ===
          "recent"
        ? "info"
        : repositoryInsights?.activity ===
            "stale"
          ? "warning"
          : undefined;

  return (
    <Card
      padding="lg"
      className="rounded-2xl"
    >
      <div
        className="
          flex
          flex-col
          gap-8
          xl:flex-row
          xl:items-start
          xl:justify-between
        "
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="
                rounded-full
                bg-gray-100
                px-3
                py-1
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-gray-600
                dark:bg-gray-800
                dark:text-gray-300
              "
            >
              {project.domain}
            </span>

            <DifficultyBadge
              difficulty={
                project.difficulty
              }
              size="sm"
            />

            {project.beginnerFriendly && (
              <Badge variant="success">
                Beginner Friendly
              </Badge>
            )}

            {project.goodFirstIssue && (
              <Badge variant="info">
                Good First Issue
              </Badge>
            )}

            {repositoryInsights && (
              <Badge
                variant={activityVariant}
              >
                {
                  repositoryInsights.activityLabel
                }
              </Badge>
            )}

            {repositoryInsights && (
              <Badge
                variant={
                  repositoryInsights
                    .repositoryStatus
                    .variant ===
                  "neutral"
                    ? "default"
                    : repositoryInsights
                        .repositoryStatus
                        .variant
                }
              >
                {
                  repositoryInsights
                    .repositoryStatus.label
                }
              </Badge>
            )}
          </div>

          <h1
            className="
              mt-5
              break-words
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-900
              dark:text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            {project.name}
          </h1>

          <p
            className="
              mt-5
              max-w-4xl
              text-base
              leading-8
              text-gray-600
              dark:text-gray-300
              sm:text-lg
            "
          >
            {repository?.description ||
              project.description}
          </p>

          {repository && (
            <p
              className="
                mt-3
                break-all
                text-sm
                font-medium
                text-gray-500
                dark:text-gray-400
              "
            >
              github.com/
              {repository.full_name}
            </p>
          )}

          <TechnologyTags
            technologies={
              project.technologies
            }
            size="md"
            className="mt-6"
          />

          <div
            className="
              mt-6
              grid
              gap-3
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <HeroStat
              label="Stars"
              value={
                loading
                  ? "…"
                  : formatNumber(
                      repository?.stargazers_count ??
                        project.stars
                    )
              }
            />

            <HeroStat
              label="Forks"
              value={
                loading
                  ? "…"
                  : formatNumber(
                      repository?.forks_count ??
                        0
                    )
              }
            />

            <HeroStat
              label="Open issues"
              value={
                loading
                  ? "…"
                  : formatNumber(
                      repository?.open_issues_count ??
                        0
                    )
              }
            />

            <HeroStat
              label="Activity"
              value={
                loading
                  ? "…"
                  : repositoryInsights?.maintenanceLabel ??
                    "Unknown"
              }
            />
          </div>

          {repositoryInsights && (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {
                repositoryInsights.activityDescription
              }
            </p>
          )}
        </div>

        <div
          className="
            flex
            w-full
            shrink-0
            flex-col
            gap-2
            xl:w-56
          "
        >
          <Button
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 w-full"
          >
            View on GitHub →
          </Button>

          <BookmarkButton
            projectId={project.id}
          />

          <ShareButton
            projectPath={projectPath}
          />

          <Button
            href="/projects"
            variant="secondary"
            className="min-h-11 w-full"
          >
            ← Back to Projects
          </Button>
        </div>
      </div>
    </Card>
  );
}

const ProjectDetails = ({
  project,
}: ProjectDetailsProps) => {
  const projectPath =
    `/projects/${project.id}`;

  const {
    repository,
    readme,
    languages,
    commits,
    releases,
    contributors,
    loading,
    error,
  } = useGitHubProject(
    project.githubUrl
  );

  const repositoryInsights =
    repository
      ? getRepositoryInsights(
          repository
        )
      : null;

  const githubUrl =
    repository?.html_url ||
    project.githubUrl;

  return (
    <div className="space-y-8">
      <ProjectHero
        project={project}
        projectPath={projectPath}
        repository={repository}
        repositoryInsights={
          repositoryInsights
        }
        loading={loading}
        githubUrl={githubUrl}
      />

      {loading && <GitHubLoading />}

      {!loading && error && (
        <Card
          padding="lg"
          className="
            rounded-2xl
            border-amber-200
            bg-amber-50
            dark:border-amber-900
            dark:bg-amber-950/20
          "
        >
          <div className="flex gap-3">
            <span className="text-xl">
              ⚠️
            </span>

            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                GitHub information unavailable
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                We couldn&apos;t load live GitHub
                information right now. The
                project&apos;s local information is
                still available.
              </p>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-3
                  inline-block
                  text-sm
                  font-semibold
                  text-blue-600
                  hover:underline
                  dark:text-blue-400
                "
              >
                Open repository directly →
              </a>
            </div>
          </div>
        </Card>
      )}

      <div
        className="
                  grid
                  gap-8
                  lg:grid-cols-[minmax(0,1fr)_360px]
                  lg:items-start
                "
      >
        <div className="min-w-0 space-y-8">
          <ProjectOverview
            project={project}
            repositoryDescription={
              repository?.description
            }
          />

          <ReadmeSection
            readme={readme}
            githubUrl={project.githubUrl}
            defaultBranch={
              repository?.default_branch ??
              "main"
            }
          />

          {!loading && repository && (
            <RepositoryActivity
              commits={commits}
            />
          )}

          {!loading && repository && (
            <RepositoryReleases
              releases={releases}
            />
          )}

          {!loading && repository && (
            <RepositoryContributors
              contributors={
                contributors
              }
            />
          )}

          {!loading && (
            <LanguageBreakdown
              languages={languages}
            />
          )}
        </div>

        <aside
          className="
            min-w-0
            space-y-8
            lg:sticky
            lg:top-24
            lg:self-start
          "
        >
          <ProjectProfile
            project={project}
          />

          {!loading &&
            repository &&
            repositoryInsights && (
              <RepositoryHealth
                repository={repository}
                insights={
                  repositoryInsights
                }
              />
            )}

          {!loading && repository && (
            <RepositoryMetadata
              repository={repository}
            />
          )}

          <TechnologyStack
            technologies={
              project.technologies
            }
          />

          <ContributionGuide
            project={project}
          />

          <QuickActions
            projectId={project.id}
            projectPath={projectPath}
            githubUrl={githubUrl}
          />
        </aside>
      </div>

      <ExplorerGuide />

      <GitHubCTA githubUrl={githubUrl} />

      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <Button
          href="/projects"
          variant="secondary"
          className="min-h-11"
        >
          ← Explore More Projects
        </Button>

        <div className="flex flex-col gap-3 sm:flex-row">
          <BookmarkButton
            projectId={project.id}
          />

          <ShareButton
            projectPath={projectPath}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
