"use client";

// libs
import { useLocale } from "next-intl";
// types
import type { DateTimeVariant, DateTimeValue } from "@/types/DateTime";
// hooks
import { useHasMounted } from "@/hooks";
// others
import { formatDateTime } from "@/utils";

const FormatTime = ({
  value,
  variant
}: {
  value: DateTimeValue;
  variant: DateTimeVariant;
}) => {
  const locale = useLocale();
  const mounted = useHasMounted();

  const parsed =
    value === null || value === undefined || value === ""
      ? null
      : new Date(value);
  const iso =
    parsed && !Number.isNaN(parsed.getTime())
      ? parsed.toISOString()
      : undefined;

  const text = formatDateTime(
    value,
    variant,
    locale,
    mounted ? undefined : { timeZone: "UTC" }
  );

  return (
    <time dateTime={iso} suppressHydrationWarning>
      {text}
    </time>
  );
};

export default FormatTime;
