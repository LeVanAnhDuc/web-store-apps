"use client";

// libs
import { format } from "date-fns";
import { enUS, vi } from "date-fns/locale";
import { useLocale } from "next-intl";
// types
import type { AdminLoginHistoryFilterFormValues } from "@/types/LoginHistory";
// components
import { FormField, FormItem } from "@/components/ui/form";
import CustomDateInput from "@/components/CustomDateInput";
// hooks
import { useFieldProps } from "@/hooks";
// others
import CONSTANTS from "@/constants";
import { parseLocalDate } from "@/utils";

const { TO_DATE } =
  CONSTANTS.FIELD_NAMES.ADMIN_LOGIN_HISTORY_FILTER_FIELD_NAMES;

const MIN_FILTER_DATE = new Date(2000, 0, 1);
const MAX_FILTER_DATE = new Date(2100, 11, 31);

const ToDateFilter = ({
  label,
  placeholder
}: {
  label: string;
  placeholder: string;
}) => {
  const locale = useLocale();
  const dateLocale = locale === "vi" ? vi : enUS;
  const { field } = useFieldProps<AdminLoginHistoryFilterFormValues>(TO_DATE);
  return (
    <FormField
      {...field}
      render={({ field: rhfField }) => (
        <FormItem>
          <CustomDateInput
            value={rhfField.value ? parseLocalDate(rhfField.value) : undefined}
            onChange={(date) =>
              rhfField.onChange(date ? format(date, "yyyy-MM-dd") : "")
            }
            dateLocale={dateLocale}
            minDate={MIN_FILTER_DATE}
            maxDate={MAX_FILTER_DATE}
            label={label}
            placeholder={placeholder}
          />
        </FormItem>
      )}
    />
  );
};

export default ToDateFilter;
