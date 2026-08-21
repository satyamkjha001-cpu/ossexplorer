"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  GitHubCommit,
  GitHubLanguages,
  GitHubRelease,
  GitHubRepository,
} from "@/lib/github";

type GitHubProjectResponse = {
  repository: GitHubRepository | null;
  readme: string | null;
  languages: GitHubLanguages | null;
  commits: GitHubCommit[] | null;
  releases: GitHubRelease[] | null;
};

type UseGitHubProjectResult = {
  repository: GitHubRepository | null;
  readme: string | null;
  languages: GitHubLanguages | null;
  commits: GitHubCommit[] | null;
  releases: GitHubRelease[] | null;
  loading: boolean;
  error: string | null;
};

function parseGitHubUrl(
  githubUrl: string
) {
  try {
    const url = new URL(githubUrl);

    if (
      url.hostname !== "github.com" &&
      url.hostname !== "www.github.com"
    ) {
      return null;
    }

    const parts = url.pathname
      .split("/")
      .filter(Boolean);

    if (parts.length < 2) {
      return null;
    }

    return {
      owner: parts[0],
      repo: parts[1].replace(
        /\.git$/,
        ""
      ),
    };
  } catch {
    return null;
  }
}

export function useGitHubProject(
  githubUrl: string
): UseGitHubProjectResult {
  const [
    repository,
    setRepository,
  ] = useState<GitHubRepository | null>(
    null
  );

  const [
    readme,
    setReadme,
  ] = useState<string | null>(
    null
  );

  const [
    languages,
    setLanguages,
  ] = useState<GitHubLanguages | null>(
    null
  );

  const [
    commits,
    setCommits,
  ] = useState<GitHubCommit[] | null>(
    null
  );

  const [
    releases,
    setReleases,
  ] = useState<GitHubRelease[] | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );

  useEffect(() => {
    const controller =
      new AbortController();

    async function loadProject() {
      setLoading(true);
      setError(null);

      const parsed =
        parseGitHubUrl(githubUrl);

      if (!parsed) {
        setRepository(null);
        setReadme(null);
        setLanguages(null);
        setCommits(null);
        setReleases(null);

        setError(
          "Invalid GitHub repository URL."
        );

        setLoading(false);

        return;
      }

      try {
        const response =
          await fetch(
            `/api/github/${encodeURIComponent(
              parsed.owner
            )}/${encodeURIComponent(
              parsed.repo
            )}`,
            {
              signal:
                controller.signal,
            }
          );

        if (!response.ok) {
          throw new Error(
            `GitHub API request failed with status ${response.status}`
          );
        }

        const data =
          (await response.json()) as GitHubProjectResponse;

        setRepository(
          data.repository
        );

        setReadme(
          data.readme
        );

        setLanguages(
          data.languages
        );

        setCommits(
          data.commits
        );

        setReleases(
          data.releases
        );

        if (
          !data.repository &&
          !data.readme &&
          !data.languages &&
          !data.commits &&
          !data.releases
        ) {
          setError(
            "Unable to load GitHub repository information."
          );
        }
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Failed to load GitHub project:",
          err
        );

        setRepository(null);
        setReadme(null);
        setLanguages(null);
        setCommits(null);
        setReleases(null);

        setError(
          "Unable to load GitHub repository information."
        );
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      controller.abort();
    };
  }, [githubUrl]);

  return {
    repository,
    readme,
    languages,
    commits,
    releases,
    loading,
    error,
  };
}