"use client";

// types
import type { ContactAdminFormValues } from "@/types/ContactAdmin";
// components
import FormFieldMessage from "@/components/FormFieldMessage";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormDescription
} from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
// hooks
import useFieldProps from "@/hooks/useFieldProps";
// others
import CONSTANTS from "@/constants";

const { EMAIL } = CONSTANTS.FIELD_NAMES.CONTACT_ADMIN_FIELD_NAMES;

const EmailInput = ({
  disabled = false,
  hint,
  labels
}: {
  disabled?: boolean;
  hint?: string;
  labels: {
    label: string;
    labelNote?: string;
  };
}) => {
  const { field } = useFieldProps<ContactAdminFormValues>(EMAIL);

  return (
    <FormItem>
      <FormLabel>
        {labels.label}
        {labels.labelNote && (
          <span className="text-muted-foreground ml-1 text-xs font-normal">
            {labels.labelNote}
          </span>
        )}
      </FormLabel>
      <FormControl>
        <CustomInput
          {...field}
          type="email"
          placeholder="email@example.com"
          disabled={disabled}
        />
      </FormControl>
      {hint && <FormDescription>{hint}</FormDescription>}
      <FormFieldMessage />
    </FormItem>
  );
};

export default EmailInput;
