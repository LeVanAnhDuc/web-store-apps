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
import CustomInput from "@/components/CustomInput";
// hooks
import { useFieldProps } from "@/hooks";
// others
import CONSTANTS from "@/constants";

const { IP } = CONSTANTS.FIELD_NAMES.ADMIN_LOGIN_HISTORY_FILTER_FIELD_NAMES;

const IpFilter = ({
  label,
  placeholder
}: {
  label: string;
  placeholder: string;
}) => {
  const { field } = useFieldProps<AdminLoginHistoryFilterFormValues>(IP);
  return (
    <FormField
      {...field}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-muted-foreground text-xs">
            {label}
          </FormLabel>
          <FormControl>
            <CustomInput {...field} placeholder={placeholder} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default IpFilter;
