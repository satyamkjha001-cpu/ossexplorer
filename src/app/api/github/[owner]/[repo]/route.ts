import { NextResponse } from "next/server";

import {
  getGitHubLanguages,
  getGitHubReadme,
  getGitHubRepository,
} from "@/lib/github";

type RouteContext = {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { owner, repo } =
      await context.params;

    if (!owner || !repo) {
      return NextResponse.json(
        {
          error:
            "GitHub owner and repository are required.",
        },
        {
          status: 400,
        }
      );
    }

    const githubUrl =
      `https://github.com/${encodeURIComponent(
        owner
      )}/${encodeURIComponent(repo)}`;

    const [
      repository,
      readme,
      languages,
    ] = await Promise.all([
      getGitHubRepository(githubUrl),
      getGitHubReadme(githubUrl),
      getGitHubLanguages(githubUrl),
    ]);

    if (!repository && !readme) {
      return NextResponse.json(
        {
          error:
            "Unable to load GitHub repository information.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        repository,
        readme,
        languages,
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error(
      "GitHub API route error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to load GitHub repository information.",
      },
      {
        status: 500,
      }
    );
  }
}