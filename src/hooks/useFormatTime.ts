"use client";

// libs
import { useCallback } from "react";
import { useLocale } from "next-intl";
// types
import type { DateTimeVariant, DateTimeValue } from "@/types/DateTime";
// hooks
import useHasMounted from "./useHasMounted";
// others
import { formatDateTime } from "@/utils";

/**
 * Returns a locale-bound formatter. Callback arg order is (variant, value)
 * — intentionally variant-first for readable call sites, e.g. ft("relative", iso).
 */
const useFormatTime = () => {
  const locale = useLocale();
  const mounted = useHasMounted();

  return useCallback(
    (variant: DateTimeVariant, value: DateTimeValue): string =>
      formatDateTime(
        value,
        variant,
        locale,
        mounted ? undefined : { timeZone: "UTC" }
      ),
    [locale, mounted]
  );
};

export default useFormatTime;
