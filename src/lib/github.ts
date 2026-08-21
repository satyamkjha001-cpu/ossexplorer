export type GitHubRepository = {
  id: number;
  name: string;
  full_name: string;

  html_url: string;

  description: string | null;

  homepage: string | null;

  private: boolean;

  fork: boolean;

  archived: boolean;

  disabled: boolean;

  is_template: boolean;

  stargazers_count: number;

  forks_count: number;

  open_issues_count: number;

  watchers_count: number;

  language: string | null;

  size: number;

  license: {
    name: string;
    spdx_id: string | null;
  } | null;

  topics: string[];

  has_issues: boolean;

  has_projects: boolean;

  has_wiki: boolean;

  has_discussions: boolean;

  has_pages: boolean;

  has_downloads: boolean;

  has_pull_requests: boolean;

  allow_forking: boolean;

  created_at: string;

  updated_at: string;

  pushed_at: string | null;

  default_branch: string;

  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
};

export type GitHubReadme = {
  name: string;

  path: string;

  html_url: string;

  download_url: string | null;

  content: string;

  encoding: string;
};

export type GitHubLanguages = Record<
  string,
  number
>;

/* ========================================
   GITHUB COMMIT
======================================== */

export type GitHubCommit = {
  sha: string;

  html_url: string;

  commit: {
    message: string;

    author: {
      name: string;
      email: string;
      date: string;
    } | null;

    committer: {
      name: string;
      email: string;
      date: string;
    } | null;
  };

  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;

  committer: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
};

/* ========================================
   EXTRACT OWNER + REPOSITORY
======================================== */

export function parseGitHubUrl(
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

/* ========================================
   COMMON HEADERS
======================================== */

const githubHeaders = {
  Accept:
    "application/vnd.github+json",

  "X-GitHub-Api-Version":
    "2022-11-28",
};

/* ========================================
   GET REPOSITORY
======================================== */

export async function getGitHubRepository(
  githubUrl: string
): Promise<GitHubRepository | null> {
  const parsed =
    parseGitHubUrl(githubUrl);

  if (!parsed) {
    return null;
  }

  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(
      parsed.owner
    )}/${encodeURIComponent(
      parsed.repo
    )}`,
    {
      headers: githubHeaders,

      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

/* ========================================
   GET README
======================================== */

export async function getGitHubReadme(
  githubUrl: string
): Promise<string | null> {
  const parsed =
    parseGitHubUrl(githubUrl);

  if (!parsed) {
    return null;
  }

  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(
      parsed.owner
    )}/${encodeURIComponent(
      parsed.repo
    )}/readme`,
    {
      headers: {
        ...githubHeaders,

        Accept:
          "application/vnd.github.raw+json",
      },

      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.text();
}

/* ========================================
   GET LANGUAGES
======================================== */

export async function getGitHubLanguages(
  githubUrl: string
): Promise<GitHubLanguages | null> {
  const parsed =
    parseGitHubUrl(githubUrl);

  if (!parsed) {
    return null;
  }

  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(
      parsed.owner
    )}/${encodeURIComponent(
      parsed.repo
    )}/languages`,
    {
      headers: githubHeaders,

      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

/* ========================================
   GET RECENT COMMITS
======================================== */

export async function getGitHubCommits(
  githubUrl: string
): Promise<GitHubCommit[] | null> {
  const parsed =
    parseGitHubUrl(githubUrl);

  if (!parsed) {
    return null;
  }

  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(
      parsed.owner
    )}/${encodeURIComponent(
      parsed.repo
    )}/commits?per_page=5`,
    {
      headers: githubHeaders,

      next: {
        revalidate: 1800,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}