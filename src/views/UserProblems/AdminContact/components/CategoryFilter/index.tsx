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

const { CATEGORY } = CONSTANTS.FIELD_NAMES.ADMIN_CONTACT_FILTER_FIELD_NAMES;
const ALL_VALUE = "__all";

const CATEGORIES = [
  "account",
  "technical",
  "feature",
  "billing",
  "security",
  "other"
] as const;

const CategoryFilter = ({
  label,
  allLabel,
  categoryLabels
}: {
  label: string;
  allLabel: string;
  categoryLabels: Record<(typeof CATEGORIES)[number], string>;
}) => {
  const { field } = useFieldProps<AdminContactFilterFormValues>(CATEGORY);
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
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {categoryLabels[c]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default CategoryFilter;
