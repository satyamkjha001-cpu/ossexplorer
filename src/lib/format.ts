/** Compact star count: 24900 → "24.9k", 496 → "496" */
export function formatStars(stars: number): string {
  if (stars >= 1_000_000) {
    const value = stars / 1_000_000;
    return `${value >= 10 ? Math.round(value) : value.toFixed(1).replace(/\.0$/, "")}M`;
  }

  if (stars >= 1_000) {
    const value = stars / 1_000;
    return `${value >= 100 ? Math.round(value) : value.toFixed(1).replace(/\.0$/, "")}k`;
  }

  return stars.toLocaleString();
}

export function formatDateAdded(dateAdded: string): string {
  const date = new Date(`${dateAdded}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return dateAdded;
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
