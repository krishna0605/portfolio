export const contributionLevels = [
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
] as const;

export type ContributionLevel = (typeof contributionLevels)[number];

export interface ContributionDay {
  date: string;
  weekday: number;
  count: number;
  level: ContributionLevel;
}

export interface ContributionMonth {
  name: string;
  firstDay: string;
  totalWeeks: number;
}

export interface ContributionWeek {
  firstDay: string;
  days: ContributionDay[];
}

export interface ContributionResponse {
  username: "krishna0605";
  year: number;
  rangeLabel: "last-year" | "calendar-year";
  availableYears: number[];
  totalContributions: number;
  months: ContributionMonth[];
  weeks: ContributionWeek[];
  updatedAt: string;
}

export interface ContributionErrorResponse {
  error: {
    code: "INVALID_YEAR" | "CONTRIBUTIONS_NOT_CONFIGURED" | "GITHUB_UNAVAILABLE";
    message: string;
  };
}
