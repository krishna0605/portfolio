import { NextRequest, NextResponse } from "next/server";
import {
  getGitHubContributions,
  GitHubContributionsError,
  isValidContributionYear,
} from "@/lib/githubContributions";
import type { ContributionErrorResponse } from "@/types/githubContributions";

export const runtime = "nodejs";

const cacheHeaders = {
  "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
};

export async function GET(request: NextRequest) {
  const currentYear = new Date().getUTCFullYear();
  const requestedYear = request.nextUrl.searchParams.get("year") ?? String(currentYear);

  if (!isValidContributionYear(requestedYear)) {
    return NextResponse.json<ContributionErrorResponse>(
      {
        error: {
          code: "INVALID_YEAR",
          message: `Choose a year between 2008 and ${currentYear}.`,
        },
      },
      { status: 400 },
    );
  }

  try {
    const data = await getGitHubContributions(Number(requestedYear));
    return NextResponse.json(data, { headers: cacheHeaders });
  } catch (error) {
    const contributionError =
      error instanceof GitHubContributionsError
        ? error
        : new GitHubContributionsError("GITHUB_UNAVAILABLE", 502);

    const message =
      contributionError.code === "CONTRIBUTIONS_NOT_CONFIGURED"
        ? "GitHub activity is not configured yet."
        : "GitHub activity is temporarily unavailable.";

    return NextResponse.json<ContributionErrorResponse>(
      { error: { code: contributionError.code, message } },
      { status: contributionError.status },
    );
  }
}
