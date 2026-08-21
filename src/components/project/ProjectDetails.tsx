"use client";

import BookmarkButton from "@/components/project/BookmarkButton";
import DifficultyBadge from "@/components/project/DifficultyBadge";
import ShareButton from "@/components/project/ShareButton";
import StarCount from "@/components/project/StarCount";
import TechnologyTags from "@/components/project/TechnologyTags";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useGitHubProject } from "@/hooks/useGitHubProject";
import { formatDateAdded } from "@/lib/format";

import type { Project } from "@/data/projects";

type ProjectDetailsProps = {
  project: Project;
};

function formatGitHubDate(
  date: string | null
) {
  if (!date) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  ).format(new Date(date));
}

function formatNumber(
  value: number
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      notation: "compact",
      maximumFractionDigits: 1,
    }
  ).format(value);
}

function ReadmeSection({
  readme,
}: {
  readme: string | null;
}) {
  if (!readme) {
    return (
      <div
        className="
          rounded-xl
          border
          border-dashed
          border-gray-300
          p-6
          text-sm
          text-gray-500
          dark:border-gray-700
          dark:text-gray-400
        "
      >
        README information is not
        available for this repository.
      </div>
    );
  }

  return (
    <details
      className="
        group
        rounded-xl
        border
        border-gray-200
        dark:border-gray-800
      "
    >
      <summary
        className="
          cursor-pointer
          list-none
          px-5
          py-4
          font-semibold
          text-gray-900
          dark:text-white
        "
      >
        <span className="group-open:hidden">
          Read repository README
        </span>

        <span className="hidden group-open:inline">
          Hide repository README
        </span>
      </summary>

      <div
        className="
          border-t
          border-gray-200
          p-5
          dark:border-gray-800
        "
      >
        <pre
          className="
            max-h-[700px]
            overflow-auto
            whitespace-pre-wrap
            break-words
            font-sans
            text-sm
            leading-7
            text-gray-600
            dark:text-gray-300
          "
        >
          {readme}
        </pre>
      </div>
    </details>
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
    loading,
    error,
  } = useGitHubProject(
    project.githubUrl
  );

  const technologyCount =
    project.technologies.length;

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
          </div>

          <div className="shrink-0">
            <DifficultyBadge
              difficulty={
                project.difficulty
              }
            />
          </div>
        </div>

        {/* Actions */}

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

      {loading && (
        <Card
          padding="lg"
          className="rounded-2xl"
        >
          <div className="animate-pulse space-y-4">
            <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-8 w-64 rounded bg-gray-200 dark:bg-gray-800" />

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
          </div>
        </Card>
      )}

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
          <h2 className="font-semibold text-gray-900 dark:text-white">
            GitHub information unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
            We couldn't load live GitHub
            information right now. The local
            project information is still
            available below.
          </p>
        </Card>
      )}

      {/* ========================================
          LIVE GITHUB STATS
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
                Stars
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
                Forks
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
                Open Issues
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
                Primary Language
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
              gap-4
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
            <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-800">
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
        </Card>
      )}

      {/* ========================================
          ABOUT
      ======================================== */}

      <Card
        padding="lg"
        className="rounded-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Overview
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          What is {project.name}?
        </h2>

        <p className="mt-4 max-w-4xl text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
          {repository?.description ||
            project.description}
        </p>

        <div
          className="
            mt-6
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            p-5
            dark:border-gray-800
            dark:bg-gray-800/50
          "
        >
          <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
            This project is categorized under{" "}
            <strong className="text-gray-900 dark:text-white">
              {project.domain}
            </strong>{" "}
            and is currently classified as{" "}
            <strong className="text-gray-900 dark:text-white">
              {project.difficulty}
            </strong>
            .
          </p>
        </div>
      </Card>

      {/* ========================================
          TECHNOLOGY STACK
      ======================================== */}

      <Card
        padding="lg"
        className="rounded-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Stack
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          Technologies
        </h2>

        <TechnologyTags
          technologies={
            project.technologies
          }
          size="md"
          className="mt-5"
        />
      </Card>

      {/* ========================================
          CONTRIBUTION
      ======================================== */}

      <Card
        padding="lg"
        className="rounded-2xl"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Open Source
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          Contribution potential
        </h2>

        <div
          className="
            mt-6
            grid
            gap-4
            sm:grid-cols-2
          "
        >
          <div
            className="
              rounded-xl
              border
              border-gray-200
              p-5
              dark:border-gray-800
            "
          >
            {project.beginnerFriendly ? (
              <>
                <Badge variant="success">
                  Beginner Friendly
                </Badge>

                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  This project is marked as
                  beginner friendly in the
                  Explorer dataset.
                </p>
              </>
            ) : (
              <>
                <Badge>
                  Not Marked Beginner Friendly
                </Badge>

                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  This project is not currently
                  marked as beginner friendly.
                </p>
              </>
            )}
          </div>

          <div
            className="
              rounded-xl
              border
              border-gray-200
              p-5
              dark:border-gray-800
            "
          >
            {project.goodFirstIssue ? (
              <>
                <Badge variant="info">
                  Good First Issue
                </Badge>

                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  The Explorer marks this
                  repository as having
                  good-first-issue opportunities.
                  Check GitHub for the current
                  issues.
                </p>
              </>
            ) : (
              <>
                <Badge>
                  No Good First Issue Signal
                </Badge>

                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  No good-first-issue signal is
                  currently stored in the Explorer.
                </p>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* ========================================
          README
      ======================================== */}

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

        <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
          This is the README retrieved from
          the project's GitHub repository.
          Use it to understand the project,
          setup instructions, features, and
          usage documented by the maintainers.
        </p>

        <div className="mt-6">
          <ReadmeSection
            readme={readme}
          />
        </div>
      </Card>

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

        <ol className="mt-6 space-y-4">
          <li className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              1
            </span>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Understand the project
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Start with the description and
                README to understand what the
                project actually does.
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              2
            </span>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Check the technology stack
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Compare the technologies with
                the skills you already know or
                want to learn.
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              3
            </span>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Inspect repository activity
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Check stars, forks, issues, and
                recent updates before deciding
                whether the project is worth
                deeper exploration.
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              4
            </span>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Explore the source
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Open GitHub and inspect the source
                structure, documentation, issues,
                and contribution guidelines.
              </p>
            </div>
          </li>
        </ol>
      </Card>

      {/* ========================================
          FINAL GITHUB CTA
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
              Open the repository to read the
              latest documentation, inspect the
              source code, check issues, and see
              the current project activity.
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