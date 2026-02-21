"use client";

// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
import type { ContactAdminMessages } from "@/types/libs";
// components
import FormFieldMessage from "@/components/FormFieldMessage";
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
import { CATEGORIES } from "@/dataSources/ContactAdmin";
// others
import CONSTANTS from "@/constants";

const { CATEGORY } = CONSTANTS.FIELD_NAMES.CONTACT_ADMIN_FIELD_NAMES;

const CategorySelect = ({
  disabled = false,
  labels
}: {
  disabled?: boolean;
  labels: {
    label: string;
    placeholder: string;
    options: ContactAdminMessages["form"]["category"];
  };
}) => {
  const { field } = useFieldProps<ContactAdminFormValues>(CATEGORY);

  return (
    <FormItem>
      <FormLabel>
        {labels.label} <span className="text-destructive">*</span>
      </FormLabel>
      <Select
        onValueChange={field.onChange}
        value={field.value}
        disabled={disabled}
      >
        <FormControl>
          <CustomSelectTrigger>
            <SelectValue placeholder={labels.placeholder} />
          </CustomSelectTrigger>
        </FormControl>
        <SelectContent>
          {CATEGORIES.map((category) => (
            <SelectItem key={category} value={category}>
              {labels.options[category]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormFieldMessage />
    </FormItem>
  );
};

export default CategorySelect;
