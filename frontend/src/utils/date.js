export function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatShortDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatRelativeDate(value) {
  const date = new Date(value);
  const now = new Date();
  const seconds = Math.round((date.getTime() - now.getTime()) / 1000);
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [unit, unitSeconds] of units) {
    const amount = Math.trunc(seconds / unitSeconds);

    if (Math.abs(amount) >= 1) {
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(amount, unit);
    }
  }

  return "just now";
}
