"use client";

// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
import type { ContactAdminMessages } from "@/types/libs";
// components
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import CustomSelectTrigger from "@/components/CustomSelectTrigger";
// hooks
import useFieldProps from "@/hooks/useFieldProps";
// dataSources
import { PRIORITY_VALUES, PRIORITIES } from "@/dataSources/ContactAdmin";
// others
import CONSTANTS from "@/constants";

const { PRIORITY } = CONSTANTS.FIELD_NAMES.CONTACT_ADMIN_FIELD_NAMES;

const PrioritySelect = ({
  disabled = false,
  labels
}: {
  disabled?: boolean;
  labels: {
    label: string;
    options: ContactAdminMessages["form"]["priority"];
  };
}) => {
  const { field } = useFieldProps<ContactAdminFormValues>(PRIORITY);

  return (
    <FormItem>
      <FormLabel>{labels.label}</FormLabel>
      <Select
        onValueChange={field.onChange}
        value={field.value}
        disabled={disabled}
      >
        <FormControl>
          <CustomSelectTrigger>
            <SelectValue />
          </CustomSelectTrigger>
        </FormControl>
        <SelectContent>
          {PRIORITY_VALUES.map((value) => (
            <SelectItem key={value} value={value}>
              <span className={PRIORITIES[value].colorClass}>
                {labels.options[value]}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};

export default PrioritySelect;
