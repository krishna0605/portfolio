import "server-only";

import { unstable_cache } from "next/cache";
import {
  contributionLevels,
  type ContributionLevel,
  type ContributionResponse,
} from "@/types/githubContributions";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_USERNAME = "krishna0605" as const;
const GITHUB_API_TIMEOUT_MS = 8_000;
const GITHUB_RETRY_DELAY_MS = 250;
const EARLIEST_GITHUB_YEAR = 2008;

const contributionsQuery = `
  query PortfolioContributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionYears
        contributionCalendar {
          totalContributions
          months {
            name
            firstDay
            totalWeeks
            year
          }
          weeks {
            firstDay
            contributionDays {
              date
              weekday
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

interface GitHubGraphQLResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionYears: number[];
        contributionCalendar: {
          totalContributions: number;
          months: Array<{
            name: string;
            firstDay: string;
            totalWeeks: number;
            year: number;
          }>;
          weeks: Array<{
            firstDay: string;
            contributionDays: Array<{
              date: string;
              weekday: number;
              contributionCount: number;
              contributionLevel: ContributionLevel;
            }>;
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message?: string }>;
}

export class GitHubContributionsError extends Error {
  constructor(
    public readonly code: "CONTRIBUTIONS_NOT_CONFIGURED" | "GITHUB_UNAVAILABLE",
    public readonly status: 502 | 503,
  ) {
    super(code);
    this.name = "GitHubContributionsError";
  }
}

export const isValidContributionYear = (value: string | null, now = new Date()) => {
  if (!value || !/^\d{4}$/.test(value)) return false;

  const year = Number(value);
  return Number.isInteger(year) && year >= EARLIEST_GITHUB_YEAR && year <= now.getUTCFullYear();
};

const getContributionRange = (year: number, now = new Date()) => {
  const currentYear = now.getUTCFullYear();

  if (year === currentYear) {
    const from = new Date(now);
    from.setUTCFullYear(from.getUTCFullYear() - 1);

    return {
      from: from.toISOString(),
      to: now.toISOString(),
      rangeLabel: "last-year" as const,
    };
  }

  return {
    from: new Date(Date.UTC(year, 0, 1)).toISOString(),
    to: new Date(Date.UTC(year + 1, 0, 1) - 1).toISOString(),
    rangeLabel: "calendar-year" as const,
  };
};

const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

const requestGitHub = async (token: string, from: string, to: string) => {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), GITHUB_API_TIMEOUT_MS);

    try {
      const response = await fetch(GITHUB_GRAPHQL_URL, {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "krishna-kapoor-portfolio",
        },
        body: JSON.stringify({
          query: contributionsQuery,
          variables: { login: GITHUB_USERNAME, from, to },
        }),
        cache: "no-store",
        signal: controller.signal,
      });

      console.info("GitHub contributions rate limit", {
        limit: response.headers.get("x-ratelimit-limit"),
        remaining: response.headers.get("x-ratelimit-remaining"),
        reset: response.headers.get("x-ratelimit-reset"),
      });

      if ([500, 502, 503, 504].includes(response.status) && attempt === 0) {
        await wait(GITHUB_RETRY_DELAY_MS);
        continue;
      }

      if (!response.ok) {
        throw new GitHubContributionsError("GITHUB_UNAVAILABLE", 502);
      }

      const payload = (await response.json()) as GitHubGraphQLResponse;
      if (payload.errors?.length || !payload.data?.user) {
        throw new GitHubContributionsError("GITHUB_UNAVAILABLE", 502);
      }

      return payload.data.user.contributionsCollection;
    } catch (error) {
      if (error instanceof GitHubContributionsError) throw error;
      if (attempt === 0) {
        await wait(GITHUB_RETRY_DELAY_MS);
        continue;
      }
      throw new GitHubContributionsError("GITHUB_UNAVAILABLE", 502);
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new GitHubContributionsError("GITHUB_UNAVAILABLE", 502);
};

const fetchGitHubContributions = async (year: number): Promise<ContributionResponse> => {
  const token = process.env.GITHUB_CONTRIBUTIONS_TOKEN;
  if (!token) {
    throw new GitHubContributionsError("CONTRIBUTIONS_NOT_CONFIGURED", 503);
  }

  const now = new Date();
  const range = getContributionRange(year, now);
  const collection = await requestGitHub(token, range.from, range.to);
  const calendar = collection.contributionCalendar;
  const currentYear = now.getUTCFullYear();
  const availableYears = [...new Set([currentYear, ...collection.contributionYears])]
    .filter((availableYear) => availableYear >= EARLIEST_GITHUB_YEAR && availableYear <= currentYear)
    .sort((a, b) => b - a);

  return {
    username: GITHUB_USERNAME,
    year,
    rangeLabel: range.rangeLabel,
    availableYears,
    totalContributions: calendar.totalContributions,
    months: calendar.months.map(({ name, firstDay, totalWeeks }) => ({ name, firstDay, totalWeeks })),
    weeks: calendar.weeks.map((week) => ({
      firstDay: week.firstDay,
      days: week.contributionDays.map((day) => ({
        date: day.date,
        weekday: day.weekday,
        count: day.contributionCount,
        level: contributionLevels.includes(day.contributionLevel) ? day.contributionLevel : "NONE",
      })),
    })),
    updatedAt: now.toISOString(),
  };
};

export const getGitHubContributions = unstable_cache(
  fetchGitHubContributions,
  ["github-contributions", GITHUB_USERNAME],
  { revalidate: 21_600, tags: ["github-contributions"] },
);
