// libs
import { toast } from "sonner";
// types
import type { Locale } from "next-intl";
// i18n
import { defaultLocale, locales } from "@/i18n/config";

export const confirmErrorToast = (message: string): Promise<void> =>
  new Promise((resolve) => {
    toast.error(message, {
      duration: Infinity,
      action: {
        label: "OK",
        onClick: () => resolve()
      }
    });
  });

export const errorToast = (message: string) => toast.error(message);

export const getCurrentLocale = (): Locale => {
  try {
    const pathname = window.location.pathname;
    const localeMatch = pathname.match(/\/([^/]+)/);
    const locale = localeMatch?.[1] as Locale;

    return locales.includes(locale) ? locale : defaultLocale;
  } catch {
    return defaultLocale;
  }
};

export const formatLastUsed = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export const parseDownloads = (downloads: string): number => {
  const num = parseInt(downloads.replace(/[^0-9]/g, ""), 10);
  if (downloads.includes("K")) return num * 1000;
  if (downloads.includes("M")) return num * 1000000;
  return num;
};
