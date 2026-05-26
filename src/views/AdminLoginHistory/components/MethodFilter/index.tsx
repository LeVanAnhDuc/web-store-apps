"use client";

// types
import type { AdminLoginHistoryFilterFormValues } from "@/types/LoginHistory";
// components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import CustomSelectTrigger from "@/components/CustomSelectTrigger";
// hooks
import { useFieldProps } from "@/hooks";
// others
import CONSTANTS from "@/constants";

const { METHOD } = CONSTANTS.FIELD_NAMES.ADMIN_LOGIN_HISTORY_FILTER_FIELD_NAMES;
const ALL_VALUE = "__all";

const METHODS = ["password", "otp", "magic-link", "forgot-password"] as const;

const MethodFilter = ({
  label,
  allLabel,
  methodLabels
}: {
  label: string;
  allLabel: string;
  methodLabels: Record<(typeof METHODS)[number], string>;
}) => {
  const { field } = useFieldProps<AdminLoginHistoryFilterFormValues>(METHOD);
  return (
    <FormField
      {...field}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-muted-foreground text-xs">
            {label}
          </FormLabel>
          <Select
            value={field.value || ALL_VALUE}
            onValueChange={(v) => field.onChange(v === ALL_VALUE ? "" : v)}
          >
            <FormControl>
              <CustomSelectTrigger>
                <SelectValue placeholder={allLabel} />
              </CustomSelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>{allLabel}</SelectItem>
              {METHODS.map((m) => (
                <SelectItem key={m} value={m}>
                  {methodLabels[m]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default MethodFilter;
