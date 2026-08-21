"use client";

import BookmarkButton from "@/components/project/BookmarkButton";
import DifficultyBadge from "@/components/project/DifficultyBadge";
import ReadmeRenderer from "@/components/project/ReadmeRenderer";
import ShareButton from "@/components/project/ShareButton";
import StarCount from "@/components/project/StarCount";

import TechnologyTags from "@/components/project/TechnologyTags";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useGitHubProject } from "@/hooks/useGitHubProject";
import { formatDateAdded } from "@/lib/format";

import type { Project } from "@/data/projects";

import ProjectOverview from "@/components/project/ProjectOverview";

import {
  getRepositoryInsights,
} from "@/lib/githubProjectInsights";

import RepositoryHealth from "@/components/project/RepositoryHealth";

import TechnologyStack from "@/components/project/TechnologyStack";

import ProjectProfile from "@/components/project/ProjectProfile";

import ContributionGuide from "@/components/project/ContributionGuide";

import ReadmeSection from "@/components/project/ReadmeSection";

type ProjectDetailsProps = {
  project: Project;
};

/* ========================================
   FORMAT GITHUB DATE
======================================== */

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

/* ========================================
   FORMAT NUMBER
======================================== */

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/* ========================================
   LOADING SKELETON
======================================== */

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
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="
                h-24
                rounded-xl
                bg-gray-200
                dark:bg-gray-800
              "
            />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="
                h-5
                rounded
                bg-gray-200
                dark:bg-gray-800
              "
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ========================================
   COMPONENT
======================================== */

const ProjectDetails = ({
  project,
}: ProjectDetailsProps) => {
  const projectPath =
    `/projects/${project.id}`;

  const {
    repository,
    readme,
    loading,
    error,
  } = useGitHubProject(
    project.githubUrl
  );



  const repositoryInsights =
  repository
    ? getRepositoryInsights(repository)
    : null;

  return (
    <div className="space-y-6">

      {/* ========================================
          HERO
      ======================================== */}

      <Card
        padding="lg"
        className="
          overflow-hidden
          rounded-2xl
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          <div className="min-w-0 flex-1">

            {/* Project labels */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
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
            </div>

            {/* Project name */}

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

            {/* GitHub description */}

            <p
              className="
                mt-5
                max-w-3xl
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

            {/* Repository name */}

            {repository && (
              <p
                className="
                  mt-4
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
          </div>

          {/* Difficulty */}

          <div className="shrink-0">
            <DifficultyBadge
              difficulty={
                project.difficulty
              }
            />
          </div>
        </div>

        {/* Hero actions */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-3
            border-t
            border-gray-200
            pt-7
            sm:flex-row
            sm:flex-wrap
            dark:border-gray-800
          "
        >
          <Button
            href={
              repository?.html_url ||
              project.githubUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="
              min-h-11
              w-full
              sm:w-auto
            "
          >
            Explore on GitHub →
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
            className="
              min-h-11
              w-full
              sm:w-auto
            "
          >
            ← Back to Projects
          </Button>
        </div>
      </Card>

      {/* ========================================
          GITHUB LOADING
      ======================================== */}

      {loading && <GitHubLoading />}

      {/* ========================================
          GITHUB ERROR
      ======================================== */}

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
                We couldn't load live GitHub
                information right now. The
                project's local information is
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

      {/* ========================================
          LIVE GITHUB REPOSITORY
      ======================================== */}

      {!loading && repository && (
        <Card
          padding="lg"
          className="rounded-2xl"
        >
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-gray-500
              dark:text-gray-400
            "
          >
            Live Repository Data
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            GitHub repository
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Information retrieved directly
            from GitHub.
          </p>

          {/* Main stats */}

          <div
            className="
              mt-6
              grid
              gap-3
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {/* Stars */}

            <div
              className="
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-4
                dark:border-gray-800
                dark:bg-gray-800/50
              "
            >
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                ⭐ Stars
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(
                  repository.stargazers_count
                )}
              </p>
            </div>

            {/* Forks */}

            <div
              className="
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-4
                dark:border-gray-800
                dark:bg-gray-800/50
              "
            >
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                🍴 Forks
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(
                  repository.forks_count
                )}
              </p>
            </div>

            {/* Issues */}

            <div
              className="
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-4
                dark:border-gray-800
                dark:bg-gray-800/50
              "
            >
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                🐛 Open Issues
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(
                  repository.open_issues_count
                )}
              </p>
            </div>

            {/* Language */}

            <div
              className="
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-4
                dark:border-gray-800
                dark:bg-gray-800/50
              "
            >
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                💻 Primary Language
              </p>

              <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                {repository.language ||
                  "Not specified"}
              </p>
            </div>
          </div>

          {/* Repository metadata */}

          <div
            className="
              mt-6
              grid
              gap-x-8
              gap-y-5
              border-t
              border-gray-200
              pt-6
              sm:grid-cols-2
              dark:border-gray-800
            "
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Repository
              </p>

              <p className="mt-1 break-all font-medium text-gray-900 dark:text-white">
                {repository.full_name}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                License
              </p>

              <p className="mt-1 font-medium text-gray-900 dark:text-white">
                {repository.license?.name ||
                  "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Created
              </p>

              <p className="mt-1 font-medium text-gray-900 dark:text-white">
                {formatGitHubDate(
                  repository.created_at
                )}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Last Updated
              </p>

              <p className="mt-1 font-medium text-gray-900 dark:text-white">
                {formatGitHubDate(
                  repository.updated_at
                )}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Last Push
              </p>

              <p className="mt-1 font-medium text-gray-900 dark:text-white">
                {formatGitHubDate(
                  repository.pushed_at
                )}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Default Branch
              </p>

              <p className="mt-1 font-medium text-gray-900 dark:text-white">
                {repository.default_branch}
              </p>
            </div>
          </div>

          {/* Topics */}

          {repository.topics.length > 0 && (
            <div
              className="
                mt-6
                border-t
                border-gray-200
                pt-6
                dark:border-gray-800
              "
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Repository Topics
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

          {/* GitHub repository link */}

          <div className="mt-6">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-sm
                font-semibold
                text-blue-600
                hover:underline
                dark:text-blue-400
              "
            >
              View repository on GitHub →
            </a>
          </div>
        </Card>
      )}

      {/* ========================================
              REPOSITORY HEALTH
          ======================================== */}

          {!loading &&
            repository &&
            repositoryInsights && (
              <RepositoryHealth
                repository={repository}
                insights={repositoryInsights}
              />
            )}

                {/* ========================================
              PROJECT OVERVIEW
          ======================================== */}

          <ProjectOverview
            project={project}
            repositoryDescription={
              repository?.description
            }
          />
      {/* ========================================
              TECHNOLOGY STACK
          ======================================== */}

          <TechnologyStack
            technologies={project.technologies}
          />
      {/* ========================================
            PROJECT PROFILE
        ======================================== */}

        <ProjectProfile project={project} />

      {/* ========================================
              CONTRIBUTION
          ======================================== */}

          <ContributionGuide project={project} />

      {/* ========================================
              README
          ======================================== */}

          <ReadmeSection
            readme={readme}
            githubUrl={project.githubUrl}
            defaultBranch={
              repository?.default_branch ?? "main"
            }
          />

      {/* ========================================
          HOW TO EXPLORE
      ======================================== */}

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

          {/* Step 1 */}

          <div className="flex gap-4">
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
              1
            </span>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Understand the project
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Read the project description
                and README before looking at
                individual files.
              </p>
            </div>
          </div>

          {/* Step 2 */}

          <div className="flex gap-4">
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
              2
            </span>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Understand the technology stack
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Identify technologies you already
                know and the ones you need to learn.
              </p>
            </div>
          </div>

          {/* Step 3 */}

          <div className="flex gap-4">
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
              3
            </span>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Check repository health
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Look at stars, forks, issues, and
                recent repository activity to get
                context about the project.
              </p>
            </div>
          </div>

          {/* Step 4 */}

          <div className="flex gap-4">
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
              4
            </span>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Read contribution information
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Look for CONTRIBUTING files,
                issue labels, and contribution
                guidelines in the repository.
              </p>
            </div>
          </div>

          {/* Step 5 */}

          <div className="flex gap-4">
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
              5
            </span>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Explore the source code
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Once you understand the project,
                open the repository and inspect
                its structure and implementation.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* ========================================
          GITHUB CTA
      ======================================== */}

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
              The Explorer gives you project
              context. GitHub gives you the
              actual source code, issues,
              documentation, and contribution
              workflow.
            </p>
          </div>

          <Button
            href={
              repository?.html_url ||
              project.githubUrl
            }
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

      {/* ========================================
          FOOTER ACTIONS
      ======================================== */}

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