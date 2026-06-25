// libs
import { toast } from "sonner";
// types
import type { Locale } from "next-intl";
import type {
  LoginHistoryStatus,
  LoginHistoryMethod
} from "@/types/LoginHistory";
import type { ContactStatus, ContactCategory } from "@/types/ContactAdmin";
import type { MyProfileResponse } from "@/types/User";
import type { UpdatePersonalInfoFormValues } from "@/forms/UpdatePersonalInfo/validations";
import type { Messages } from "@/types/libs";
// dataSources
import { CONTACT_CATEGORY_VALUES } from "@/dataSources/ContactAdmin";
import { CATEGORY_LABEL_KEY } from "@/dataSources/Categories";
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

export function getTokenExpSeconds(token: string): number | null {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return typeof payload.exp === "number" ? payload.exp : null;
  } catch {
    return null;
  }
}

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

export const formatDateShort = (iso: string): string =>
  new Date(iso).toLocaleDateString(undefined, { dateStyle: "short" });

export const formatDateTimeShort = (iso: string): string =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short"
  });

export const formatDateTimeMedium = (iso: string): string =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });

export const formatDateLong = (iso: string | null): string | null =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, { dateStyle: "long" })
    : null;

export const parseLocalDate = (iso: string): Date => {
  const [year, month, day] = iso.split("T")[0].split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const formatYmdLocal = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const LOGIN_HISTORY_STATUSES: LoginHistoryStatus[] = ["success", "failed"];
const LOGIN_HISTORY_METHODS: LoginHistoryMethod[] = [
  "password",
  "otp",
  "magic-link",
  "forgot-password"
];
const CONTACT_STATUSES: ContactStatus[] = ["new", "processing", "resolved"];

export const isLoginHistoryStatus = (
  value: string | null
): value is LoginHistoryStatus =>
  value !== null && (LOGIN_HISTORY_STATUSES as string[]).includes(value);

export const isLoginHistoryMethod = (
  value: string | null
): value is LoginHistoryMethod =>
  value !== null && (LOGIN_HISTORY_METHODS as string[]).includes(value);

export const isContactStatus = (value: string | null): value is ContactStatus =>
  value !== null && (CONTACT_STATUSES as string[]).includes(value);

export const isContactCategory = (
  value: string | null
): value is ContactCategory =>
  value !== null && (CONTACT_CATEGORY_VALUES as string[]).includes(value);

export const buildPaginationPageNumbers = (
  page: number,
  totalPages: number
): (number | "dots")[] => {
  if (totalPages <= 5)
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  const result: (number | "dots")[] = [1];
  if (page > 3) result.push("dots");
  const middleStart = Math.max(2, page - 1);
  const middleEnd = Math.min(totalPages - 1, page + 1);
  for (let i = middleStart; i <= middleEnd; i += 1) result.push(i);
  if (page < totalPages - 2) result.push("dots");
  result.push(totalPages);
  return result;
};

type CategoryKey = keyof Messages["common"]["categories"];
type CategoryTranslator = (key: CategoryKey) => string;

export const resolveCategoryLabel = (
  t: CategoryTranslator,
  slug: string,
  fallback: string
): string => {
  const key = CATEGORY_LABEL_KEY[slug] as CategoryKey | undefined;
  return key ? t(key) : fallback;
};

export const mapProfileToFormValues = (
  profile: MyProfileResponse
): UpdatePersonalInfoFormValues => {
  const [firstName, ...rest] = profile.fullName.split(" ");
  return {
    firstName: firstName ?? "",
    lastName: rest.join(" "),
    phone: profile.phone ?? "",
    address: profile.address ?? "",
    dateOfBirth: profile.dateOfBirth
      ? profile.dateOfBirth.substring(0, 10)
      : "",
    gender: profile.gender ?? ""
  };
};

/**
 * Thay placeholder `:param` trong template endpoint bằng giá trị thực (kiểu react-router).
 * `generatePath("/posts/:id/comments/:commentId", { id: 123, commentId: 456 })`
 *   → `/posts/123/comments/456`
 * Throw khi thiếu param; encode từng giá trị bằng encodeURIComponent.
 */
export const generatePath = (
  template: string,
  params: Record<string, string | number> = {}
): string =>
  template.replace(/:([A-Za-z0-9_]+)/g, (_, key) => {
    const value = params[key];
    if (value === undefined || value === null) {
      throw new Error(`generatePath: missing param "${key}" for "${template}"`);
    }
    return encodeURIComponent(String(value));
  });
