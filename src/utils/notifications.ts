// libs
import { formatDistanceToNow } from "date-fns";
import { enUS, vi } from "date-fns/locale";
// types
import { NOTIF_GROUP, type NotifGroup } from "@/types/Notification";

const DAY_MS = 24 * 60 * 60 * 1000;

export const relativeTime = (iso: string, locale: string): string =>
  formatDistanceToNow(new Date(iso), {
    addSuffix: true,
    locale: locale === "vi" ? vi : enUS
  });

export const groupOf = (iso: string, now: number): NotifGroup => {
  const startToday = new Date(now).setHours(0, 0, 0, 0);
  const t = new Date(iso).getTime();
  if (t >= startToday) return NOTIF_GROUP.TODAY;
  if (t >= startToday - DAY_MS) return NOTIF_GROUP.YESTERDAY;
  return NOTIF_GROUP.EARLIER;
};
