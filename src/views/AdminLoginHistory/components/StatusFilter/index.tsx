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

const { STATUS } = CONSTANTS.FIELD_NAMES.ADMIN_LOGIN_HISTORY_FILTER_FIELD_NAMES;
const ALL_VALUE = "__all";

const StatusFilter = ({
  label,
  allLabel,
  successLabel,
  failedLabel
}: {
  label: string;
  allLabel: string;
  successLabel: string;
  failedLabel: string;
}) => {
  const { field } = useFieldProps<AdminLoginHistoryFilterFormValues>(STATUS);
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
              <SelectItem value="success">{successLabel}</SelectItem>
              <SelectItem value="failed">{failedLabel}</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default StatusFilter;
