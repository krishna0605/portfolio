"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ExternalLink, Github, RefreshCw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type {
  ContributionDay,
  ContributionErrorResponse,
  ContributionLevel,
  ContributionResponse,
} from "@/types/githubContributions";
import { usePersona } from "./PersonaProvider";

const currentYear = new Date().getUTCFullYear();
const cellSize = 12;
const cellGap = 3;
const cellPitch = cellSize + cellGap;

const levelClasses: Record<ContributionLevel, string> = {
  NONE: "bg-[#ebedf0] dark:bg-[#161b22]",
  FIRST_QUARTILE: "bg-[#9be9a8] dark:bg-[#0e4429]",
  SECOND_QUARTILE: "bg-[#40c463] dark:bg-[#006d32]",
  THIRD_QUARTILE: "bg-[#30a14e] dark:bg-[#26a641]",
  FOURTH_QUARTILE: "bg-[#216e39] dark:bg-[#39d353]",
};

const legendLevels: ContributionLevel[] = [
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
];

const formatContributionLabel = (day: ContributionDay) => {
  const date = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${day.date}T00:00:00Z`));

  if (day.count === 0) return `No contributions on ${date}`;
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${date}`;
};

const ContributionSkeleton = () => (
  <div className="min-h-[300px] animate-pulse rounded-sm border border-grid-line p-6 motion-reduce:animate-none">
    <div className="h-6 w-60 bg-foreground/10" />
    <div className="mt-10 grid min-w-[720px] grid-cols-[repeat(40,12px)] gap-1 overflow-hidden opacity-70">
      {Array.from({ length: 280 }, (_, index) => (
        <span key={index} className="h-3 w-3 rounded-[2px] bg-foreground/10" />
      ))}
    </div>
  </div>
);

interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  loading: boolean;
  onSelect: (year: number) => void;
  mobile?: boolean;
}

const YearSelector = ({ years, selectedYear, loading, onSelect, mobile = false }: YearSelectorProps) => (
  <div
    aria-label="GitHub contribution year"
    className={
      mobile
        ? "flex max-w-full gap-2 overflow-x-auto pb-2 lg:hidden"
        : "hidden w-36 shrink-0 flex-col gap-2 lg:flex"
    }
    role="group"
  >
    {years.map((year) => (
      <button
        key={year}
        type="button"
        aria-pressed={selectedYear === year}
        disabled={loading && selectedYear === year}
        onClick={() => onSelect(year)}
        className={`shrink-0 rounded-sm border px-5 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          selectedYear === year
            ? "border-blue-500 bg-blue-600 text-white"
            : "border-transparent text-foreground/60 hover:border-grid-line hover:bg-foreground/5 hover:text-foreground"
        } disabled:cursor-wait disabled:opacity-75`}
      >
        {year}
      </button>
    ))}
  </div>
);

interface ContributionCalendarProps {
  data: ContributionResponse;
  dimmed: boolean;
}

const ContributionCalendar = ({ data, dimmed }: ContributionCalendarProps) => {
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [focusedDate, setFocusedDate] = useState<string | null>(null);
  const cellRefs = useRef(new Map<string, HTMLButtonElement>());

  const indexedDays = useMemo(
    () =>
      data.weeks.flatMap((week, weekIndex) =>
        week.days.map((day) => ({ day, weekIndex })),
      ),
    [data.weeks],
  );

  const dayIndex = useMemo(
    () => new Map(indexedDays.map((entry, index) => [entry.day.date, index])),
    [indexedDays],
  );

  useEffect(() => {
    const latestDay = indexedDays.at(-1)?.day.date ?? null;
    setFocusedDate(latestDay);
    setActiveDate(null);
  }, [indexedDays]);

  const moveFocus = (currentDate: string, amount: number) => {
    const currentIndex = dayIndex.get(currentDate);
    if (currentIndex === undefined) return;

    const target = indexedDays[Math.max(0, Math.min(indexedDays.length - 1, currentIndex + amount))];
    if (!target) return;

    setFocusedDate(target.day.date);
    setActiveDate(target.day.date);
    requestAnimationFrame(() => cellRefs.current.get(target.day.date)?.focus());
  };

  const handleGridKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, date: string) => {
    const moves: Partial<Record<string, number>> = {
      ArrowLeft: -7,
      ArrowRight: 7,
      ArrowUp: -1,
      ArrowDown: 1,
    };

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const target = event.key === "Home" ? indexedDays[0] : indexedDays.at(-1);
      if (target) {
        setFocusedDate(target.day.date);
        setActiveDate(target.day.date);
        requestAnimationFrame(() => cellRefs.current.get(target.day.date)?.focus());
      }
      return;
    }

    const amount = moves[event.key];
    if (amount !== undefined) {
      event.preventDefault();
      moveFocus(date, amount);
    }
  };

  const activeEntry = activeDate
    ? indexedDays.find((entry) => entry.day.date === activeDate)
    : undefined;

  return (
    <div className={`relative transition-opacity duration-200 ${dimmed ? "opacity-45" : "opacity-100"}`}>
      <div className="overflow-x-auto pb-3" tabIndex={-1}>
        <div className="min-w-[720px]">
          <div className="relative mb-2 ml-11 h-5" aria-hidden="true">
            {data.months.map((month) => {
              const monthStart = new Date(`${month.firstDay}T00:00:00Z`).getTime();
              const weekIndex = data.weeks.findIndex((week) => {
                const start = new Date(`${week.firstDay}T00:00:00Z`).getTime();
                return monthStart >= start && monthStart < start + 7 * 86_400_000;
              });

              if (weekIndex < 0) return null;
              return (
                <span
                  key={`${month.firstDay}-${month.name}`}
                  className="absolute text-[10px] text-foreground/55"
                  style={{ left: weekIndex * cellPitch }}
                >
                  {month.name.slice(0, 3)}
                </span>
              );
            })}
          </div>

          <div className="flex items-start">
            <div className="mr-2 grid w-9 shrink-0 grid-rows-7 gap-[3px] text-[10px] leading-3 text-foreground/45" aria-hidden="true">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>

            <div
              aria-label={`${data.totalContributions} GitHub contributions for ${data.year}`}
              className="relative grid w-max"
              role="grid"
              style={{
                gridTemplateColumns: `repeat(${data.weeks.length}, ${cellSize}px)`,
                gridTemplateRows: `repeat(7, ${cellSize}px)`,
                gap: `${cellGap}px`,
              }}
            >
              {indexedDays.map(({ day, weekIndex }) => (
                <button
                  key={day.date}
                  ref={(node) => {
                    if (node) cellRefs.current.set(day.date, node);
                    else cellRefs.current.delete(day.date);
                  }}
                  type="button"
                  role="gridcell"
                  tabIndex={focusedDate === day.date ? 0 : -1}
                  aria-label={formatContributionLabel(day)}
                  title={formatContributionLabel(day)}
                  onFocus={() => {
                    setFocusedDate(day.date);
                    setActiveDate(day.date);
                  }}
                  onBlur={() => setActiveDate(null)}
                  onMouseEnter={() => setActiveDate(day.date)}
                  onMouseLeave={() => setActiveDate(null)}
                  onKeyDown={(event) => handleGridKeyDown(event, day.date)}
                  className={`h-3 w-3 rounded-[2px] ring-offset-background transition-transform hover:scale-125 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 motion-reduce:transition-none ${levelClasses[day.level]}`}
                  style={{ gridColumn: weekIndex + 1, gridRow: day.weekday + 1 }}
                />
              ))}

              {activeEntry && (
                <span
                  role="tooltip"
                  className="pointer-events-none absolute z-20 whitespace-nowrap rounded-sm border border-white/10 bg-[#111827] px-2.5 py-1.5 text-[10px] text-white shadow-xl"
                  style={{
                    left: activeEntry.weekIndex * cellPitch + cellSize / 2,
                    top:
                      activeEntry.day.weekday < 2
                        ? activeEntry.day.weekday * cellPitch + cellSize + 8
                        : activeEntry.day.weekday * cellPitch - 32,
                    transform:
                      activeEntry.weekIndex < 5
                        ? "translateX(0)"
                        : activeEntry.weekIndex > data.weeks.length - 6
                          ? "translateX(-100%)"
                          : "translateX(-50%)",
                  }}
                >
                  {formatContributionLabel(activeEntry.day)}
                </span>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-1.5 text-[10px] text-foreground/50">
            <span>Less</span>
            {legendLevels.map((level) => (
              <span key={level} className={`h-3 w-3 rounded-[2px] ${levelClasses[level]}`} aria-hidden="true" />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GitHubContributionsSection = () => {
  const { persona } = usePersona();
  const shouldReduceMotion = useReducedMotion();
  const cache = useRef(new Map<number, ContributionResponse>());
  const requestVersion = useRef(0);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [availableYears, setAvailableYears] = useState([currentYear]);
  const [data, setData] = useState<ContributionResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const loadYear = useCallback(async (year: number, force = false) => {
    const version = ++requestVersion.current;
    setSelectedYear(year);
    setErrorMessage("");

    const cached = cache.current.get(year);
    if (cached && !force) {
      setData(cached);
      setAvailableYears(cached.availableYears);
      setStatus("success");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`/api/github-contributions?year=${year}`, {
        headers: { Accept: "application/json" },
      });
      const payload = (await response.json()) as ContributionResponse | ContributionErrorResponse;

      if (!response.ok || "error" in payload) {
        throw new Error("error" in payload ? payload.error.message : "GitHub activity is temporarily unavailable.");
      }

      if (version !== requestVersion.current) return;
      cache.current.set(year, payload);
      setData(payload);
      setAvailableYears(payload.availableYears);
      setStatus("success");
    } catch (error) {
      if (version !== requestVersion.current) return;
      setErrorMessage(error instanceof Error ? error.message : "GitHub activity is temporarily unavailable.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (persona === "engineer" && !data && status === "loading") {
      void loadYear(currentYear);
    }
  }, [data, loadYear, persona, status]);

  useEffect(() => {
    if (persona !== "engineer") {
      requestVersion.current += 1;
    }
  }, [persona]);

  const totalLabel = data
    ? data.rangeLabel === "last-year"
      ? `${data.totalContributions.toLocaleString()} contributions in the last year`
      : `${data.totalContributions.toLocaleString()} contributions in ${data.year}`
    : "GitHub contribution activity";

  return (
    <AnimatePresence initial={false}>
      {persona === "engineer" && (
        <motion.section
          id="contributions"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.35, ease: "easeOut" }}
          className="scroll-mt-20 border-b border-grid-line bg-background py-20 md:py-24"
        >
          <div className="mx-auto max-w-[1280px] px-4 md:px-6">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-blue-500 dark:text-blue-400">
                  {"// GITHUB_ACTIVITY"}
                </p>
                <p className="mt-3 max-w-2xl text-foreground/60">
                  A year-by-year view of the public work behind the projects.
                </p>
              </div>
              <a
                href="https://github.com/krishna0605"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Github size={15} /> View GitHub profile <ExternalLink size={13} />
              </a>
            </div>

            <YearSelector
              years={availableYears}
              selectedYear={selectedYear}
              loading={status === "loading"}
              onSelect={(year) => void loadYear(year)}
              mobile
            />

            <div className="mt-5 flex items-start gap-7 lg:mt-0">
              <div className="min-w-0 flex-1 border border-grid-line p-5 md:p-7">
                <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-lg font-medium text-foreground" aria-live="polite">
                    {totalLabel}
                  </p>
                  {status === "loading" && data && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-blue-500 dark:text-blue-400">
                      Updating {selectedYear}…
                    </span>
                  )}
                </div>

                {status === "loading" && !data && <ContributionSkeleton />}

                {status === "error" && (
                  <div className="flex min-h-[300px] flex-col items-center justify-center border border-dashed border-grid-line px-6 text-center">
                    <AlertCircle className="mb-4 text-blue-500 dark:text-blue-400" size={28} />
                    <h3 className="text-lg font-medium text-foreground">Contribution data unavailable</h3>
                    <p className="mt-2 max-w-md text-sm text-foreground/60">{errorMessage}</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => void loadYear(selectedYear, true)}
                        className="inline-flex items-center gap-2 border border-blue-500/40 px-4 py-2 text-xs font-mono uppercase tracking-widest text-blue-600 transition-colors hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
                      >
                        <RefreshCw size={14} /> Retry
                      </button>
                      <a
                        href="https://github.com/krishna0605"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-grid-line px-4 py-2 text-xs font-mono uppercase tracking-widest text-foreground/65 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        Open GitHub <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                )}

                {data && status !== "error" && (
                  <ContributionCalendar data={data} dimmed={status === "loading"} />
                )}
              </div>

              <YearSelector
                years={availableYears}
                selectedYear={selectedYear}
                loading={status === "loading"}
                onSelect={(year) => void loadYear(year)}
              />
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
