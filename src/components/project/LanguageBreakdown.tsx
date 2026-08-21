"use client";

import type { GitHubLanguages } from "@/lib/github";

type LanguageBreakdownProps = {
  languages: GitHubLanguages | null;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(
    bytes /
    (1024 * 1024 * 1024)
  ).toFixed(1)} GB`;
}

function getLanguagePercentage(
  bytes: number,
  total: number
): number {
  if (total <= 0) {
    return 0;
  }

  return (bytes / total) * 100;
}

export default function LanguageBreakdown({
  languages,
}: LanguageBreakdownProps) {
  if (
    !languages ||
    Object.keys(languages).length === 0
  ) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Technology
        </p>

        <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
          Language breakdown
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
          GitHub did not provide language
          statistics for this repository.
        </p>
      </div>
    );
  }

  const entries = Object.entries(
    languages
  ).sort(([, a], [, b]) => b - a);

  const total = entries.reduce(
    (sum, [, bytes]) => sum + bytes,
    0
  );

  const primaryLanguage =
    entries[0]?.[0] ?? null;

  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Technology
      </p>

      <div
        className="
          mt-2
          flex
          flex-col
          gap-2
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Language breakdown
        </h2>

        {primaryLanguage && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Primary language:{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {primaryLanguage}
            </span>
          </p>
        )}
      </div>

      <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
        Languages detected by GitHub based on
        repository source-code size.
      </p>

      {/* Distribution bar */}

      <div
        className="
          mt-6
          flex
          h-3
          w-full
          overflow-hidden
          rounded-full
          bg-gray-100
          dark:bg-gray-800
        "
        aria-label="Language distribution"
      >
        {entries.map(
          ([language, bytes]) => {
            const percentage =
              getLanguagePercentage(
                bytes,
                total
              );

            return (
              <div
                key={language}
                title={`${language}: ${percentage.toFixed(
                  1
                )}%`}
                style={{
                  width: `${percentage}%`,
                }}
                className="h-full bg-gray-900 dark:bg-gray-200"
              />
            );
          }
        )}
      </div>

      {/* Language list */}

      <div className="mt-6 space-y-4">
        {entries.map(
          ([language, bytes]) => {
            const percentage =
              getLanguagePercentage(
                bytes,
                total
              );

            return (
              <div
                key={language}
                className="space-y-2"
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {language}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatBytes(bytes)}
                    </span>

                    <span className="w-14 text-right text-sm font-semibold text-gray-900 dark:text-white">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div
                  className="
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-gray-100
                    dark:bg-gray-800
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-gray-900
                      dark:bg-gray-200
                    "
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Summary */}

      <div
        className="
          mt-6
          border-t
          border-gray-200
          pt-5
          dark:border-gray-800
        "
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Languages detected
          </span>

          <span className="font-semibold text-gray-900 dark:text-white">
            {entries.length}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total source size
          </span>

          <span className="font-semibold text-gray-900 dark:text-white">
            {formatBytes(total)}
          </span>
        </div>
      </div>
    </div>
  );
}