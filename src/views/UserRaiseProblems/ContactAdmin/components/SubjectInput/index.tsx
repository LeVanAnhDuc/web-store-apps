"use client";

// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
// components
import FormFieldMessage from "@/components/FormFieldMessage";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
// hooks
import useFieldProps from "@/hooks/useFieldProps";
// others
import CONSTANTS from "@/constants";

const { SUBJECT } = CONSTANTS.FIELD_NAMES.CONTACT_ADMIN_FIELD_NAMES;

const SubjectInput = ({
  disabled = false,
  labels
}: {
  disabled?: boolean;
  labels: {
    label: string;
    placeholder: string;
  };
}) => {
  const { field } = useFieldProps<ContactAdminFormValues>(SUBJECT);

  return (
    <FormItem>
      <FormLabel>
        {labels.label} <span className="text-destructive">*</span>
      </FormLabel>
      <FormControl>
        <CustomInput
          {...field}
          type="text"
          placeholder={labels.placeholder}
          disabled={disabled}
        />
      </FormControl>
      <FormFieldMessage />
    </FormItem>
  );
};

export default SubjectInput;
