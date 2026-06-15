"use client";

// types
import type { AdminContactFilterFormValues } from "@/types/ContactAdmin";
// components
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import SearchInput from "@/components/SearchInput";
// hooks
import { useFieldProps } from "@/hooks";
// others
import CONSTANTS from "@/constants";

const { SEARCH } = CONSTANTS.FIELD_NAMES.ADMIN_CONTACT_FILTER_FIELD_NAMES;

const SearchFilter = ({
  label,
  placeholder
}: {
  label: string;
  placeholder: string;
}) => {
  const { field } = useFieldProps<AdminContactFilterFormValues>(SEARCH);
  return (
    <FormField
      {...field}
      render={({ field }) => (
        <FormItem className="lg:col-span-2">
          <FormLabel className="text-muted-foreground text-xs">
            {label}
          </FormLabel>
          <SearchInput
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            ariaLabel={label}
          />
        </FormItem>
      )}
    />
  );
};

export default SearchFilter;
