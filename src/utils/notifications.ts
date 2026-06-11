// libs
import { formatDistanceToNow } from "date-fns";
import { enUS, vi } from "date-fns/locale";

const DAY_MS = 24 * 60 * 60 * 1000;
export type NotifGroup = "today" | "yesterday" | "earlier";

export const relativeTime = (iso: string, locale: string): string =>
  formatDistanceToNow(new Date(iso), {
    addSuffix: true,
    locale: locale === "vi" ? vi : enUS
  });

export const groupOf = (iso: string, now: number): NotifGroup => {
  const startToday = new Date(now).setHours(0, 0, 0, 0);
  const t = new Date(iso).getTime();
  if (t >= startToday) return "today";
  if (t >= startToday - DAY_MS) return "yesterday";
  return "earlier";
};
