// libs
import { toast } from "sonner";
// types
import type { Locale } from "next-intl";
// others
import CONSTANTS from "@/constants";
import { defaultLocale, locales } from "@/i18n/config";

const { CALLBACK_URL } = CONSTANTS.STORAGE_KEYS;

export const getInitials = (fullName: string): string =>
  fullName
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const getDateOfBirthBounds = () => {
  const { MIN_AGE, MAX_AGE } = CONSTANTS.SIGNUP.AGE_VALIDATION;
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - MIN_AGE,
    today.getMonth(),
    today.getDate()
  );
  const minDate = new Date(
    today.getFullYear() - MAX_AGE,
    today.getMonth(),
    today.getDate()
  );
  return { minDate, maxDate };
};

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

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return typeof payload.exp === "number" && payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function saveCallbackUrl(url: string) {
  sessionStorage.setItem(CALLBACK_URL, url);
}

export function popCallbackUrl(): string | null {
  const url = sessionStorage.getItem(CALLBACK_URL);
  if (url) sessionStorage.removeItem(CALLBACK_URL);
  return url;
}
