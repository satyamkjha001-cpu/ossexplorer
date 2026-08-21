import type { GitHubRepository } from "@/lib/github";

export type RepositoryActivity =
  | "active"
  | "recent"
  | "stale"
  | "unknown";

export type RepositoryStatus = {
  label: string;
  description: string;
  variant:
    | "success"
    | "info"
    | "warning"
    | "neutral";
};

export type RepositoryInsights = {
  activity: RepositoryActivity;

  activityLabel: string;

  activityDescription: string;

  repositoryStatus: RepositoryStatus;

  communityScore: number;

  maintenanceLabel: string;

  isArchived: boolean;

  isTemplate: boolean;

  isFork: boolean;

  hasIssues: boolean;

  hasDiscussions: boolean;

  hasPullRequests: boolean;
};

/* ========================================
   DATE HELPERS
======================================== */

function getDaysSince(
  date: string | null
): number | null {
  if (!date) {
    return null;
  }

  const timestamp =
    new Date(date).getTime();

  if (Number.isNaN(timestamp)) {
    return null;
  }

  const difference =
    Date.now() - timestamp;

  return Math.max(
    0,
    Math.floor(
      difference /
        (1000 * 60 * 60 * 24)
    )
  );
}

/* ========================================
   ACTIVITY
======================================== */

function getActivity(
  repository: GitHubRepository
): RepositoryActivity {
  const daysSincePush =
    getDaysSince(
      repository.pushed_at
    );

  if (daysSincePush === null) {
    return "unknown";
  }

  if (daysSincePush <= 30) {
    return "active";
  }

  if (daysSincePush <= 180) {
    return "recent";
  }

  return "stale";
}

/* ========================================
   ACTIVITY LABEL
======================================== */

function getActivityLabel(
  activity: RepositoryActivity
): string {
  switch (activity) {
    case "active":
      return "Active";

    case "recent":
      return "Recently Active";

    case "stale":
      return "Stale";

    default:
      return "Unknown";
  }
}

/* ========================================
   ACTIVITY DESCRIPTION
======================================== */

function getActivityDescription(
  repository: GitHubRepository,
  activity: RepositoryActivity
): string {
  const daysSincePush =
    getDaysSince(
      repository.pushed_at
    );

  if (daysSincePush === null) {
    return "Recent repository activity could not be determined.";
  }

  if (activity === "active") {
    return `Last pushed ${daysSincePush === 0 ? "today" : `${daysSincePush} days ago`}.`;
  }

  if (activity === "recent") {
    return `Last pushed ${daysSincePush} days ago.`;
  }

  return `No push activity detected in the last ${daysSincePush} days.`;
}

/* ========================================
   REPOSITORY STATUS
======================================== */

function getRepositoryStatus(
  repository: GitHubRepository
): RepositoryStatus {
  if (repository.archived) {
    return {
      label: "Archived",
      description:
        "This repository has been archived and is no longer actively maintained.",
      variant: "warning",
    };
  }

  if (repository.disabled) {
    return {
      label: "Disabled",
      description:
        "GitHub has disabled this repository.",
      variant: "warning",
    };
  }

  if (repository.is_template) {
    return {
      label: "Template",
      description:
        "This repository is configured as a GitHub template.",
      variant: "info",
    };
  }

  if (repository.fork) {
    return {
      label: "Fork",
      description:
        "This repository is a fork of another GitHub repository.",
      variant: "info",
    };
  }

  return {
    label: "Public Repository",
    description:
      "This is a standard public GitHub repository.",
    variant: "success",
  };
}

/* ========================================
   COMMUNITY SCORE
======================================== */

function getCommunityScore(
  repository: GitHubRepository
): number {
  let score = 0;

  if (repository.stargazers_count > 0) {
    score += 1;
  }

  if (repository.stargazers_count >= 100) {
    score += 1;
  }

  if (repository.stargazers_count >= 1000) {
    score += 1;
  }

  if (repository.forks_count > 0) {
    score += 1;
  }

  if (repository.open_issues_count > 0) {
    score += 1;
  }

  if (repository.has_discussions) {
    score += 1;
  }

  if (repository.has_pull_requests) {
    score += 1;
  }

  return Math.min(score, 7);
}

/* ========================================
   MAINTENANCE LABEL
======================================== */

function getMaintenanceLabel(
  repository: GitHubRepository
): string {
  const daysSincePush =
    getDaysSince(
      repository.pushed_at
    );

  if (daysSincePush === null) {
    return "Unknown";
  }

  if (daysSincePush <= 30) {
    return "Maintained recently";
  }

  if (daysSincePush <= 180) {
    return "Maintained";
  }

  return "Needs activity review";
}

/* ========================================
   MAIN INSIGHTS FUNCTION
======================================== */

export function getRepositoryInsights(
  repository: GitHubRepository
): RepositoryInsights {
  const activity =
    getActivity(repository);

  return {
    activity,

    activityLabel:
      getActivityLabel(activity),

    activityDescription:
      getActivityDescription(
        repository,
        activity
      ),

    repositoryStatus:
      getRepositoryStatus(repository),

    communityScore:
      getCommunityScore(repository),

    maintenanceLabel:
      getMaintenanceLabel(repository),

    isArchived:
      repository.archived,

    isTemplate:
      repository.is_template,

    isFork:
      repository.fork,

    hasIssues:
      repository.has_issues,

    hasDiscussions:
      repository.has_discussions,

    hasPullRequests:
      repository.has_pull_requests,
  };
}