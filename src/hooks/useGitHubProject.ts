"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getGitHubReadme,
  getGitHubRepository,
  type GitHubRepository,
} from "@/lib/github";

type UseGitHubProjectResult = {
  repository: GitHubRepository | null;
  readme: string | null;
  loading: boolean;
  error: string | null;
};

export function useGitHubProject(
  githubUrl: string
): UseGitHubProjectResult {
  const [repository, setRepository] =
    useState<GitHubRepository | null>(null);

  const [readme, setReadme] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProject() {
      setLoading(true);
      setError(null);

      try {
        const [
          repositoryData,
          readmeData,
        ] = await Promise.all([
          getGitHubRepository(
            githubUrl
          ),
          getGitHubReadme(githubUrl),
        ]);

        if (cancelled) {
          return;
        }

        setRepository(
          repositoryData
        );

        setReadme(readmeData);

        if (
          !repositoryData &&
          !readmeData
        ) {
          setError(
            "Unable to load GitHub repository information."
          );
        }
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to load GitHub project:",
          err
        );

        setError(
          "Unable to load GitHub repository information."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProject();

    return () => {
      cancelled = true;
    };
  }, [githubUrl]);

  return {
    repository,
    readme,
    loading,
    error,
  };
}