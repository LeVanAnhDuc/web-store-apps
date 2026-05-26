"use client";

// types
import type { AdminContactFilterFormValues } from "@/types/ContactAdmin";
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

const { STATUS } = CONSTANTS.FIELD_NAMES.ADMIN_CONTACT_FILTER_FIELD_NAMES;
const ALL_VALUE = "__all";

const StatusFilter = ({
  label,
  allLabel,
  newLabel,
  processingLabel,
  resolvedLabel
}: {
  label: string;
  allLabel: string;
  newLabel: string;
  processingLabel: string;
  resolvedLabel: string;
}) => {
  const { field } = useFieldProps<AdminContactFilterFormValues>(STATUS);
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
              <SelectItem value="new">{newLabel}</SelectItem>
              <SelectItem value="processing">{processingLabel}</SelectItem>
              <SelectItem value="resolved">{resolvedLabel}</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default StatusFilter;
