"use client";

// types
import type { SignupEmailFormValues } from "@/types/Signup";
// components
import CustomInput from "@/components/CustomInput";
import FormFieldMessage from "@/components/FormFieldMessage";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
// hooks
import { useFieldProps } from "@/hooks";
// others
import CONSTANTS from "@/constants";

const { EMAIL } = CONSTANTS.FIELD_NAMES.SIGNUP_FIELD_NAMES;

const EmailInput = ({
  label,
  disabled = false
}: {
  label: string;
  disabled?: boolean;
}) => {
  const { field, fieldState } = useFieldProps<SignupEmailFormValues>(EMAIL);

  return (
    <FormField
      {...field}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-foreground">{label}</FormLabel>
          <FormControl>
            <CustomInput
              {...field}
              type="email"
              placeholder="example@gmail.com"
              aria-invalid={fieldState.invalid}
              disabled={disabled}
            />
          </FormControl>
          <FormFieldMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
