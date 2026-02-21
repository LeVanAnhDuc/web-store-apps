"use client";

// libs
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// components
import CustomInput from "@/components/CustomInput";
import FormFieldMessage from "@/components/FormFieldMessage";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
// hooks
import useFieldProps from "@/hooks/useFieldProps";

const PasswordInput = ({
  name,
  label,
  placeholder,
  disabled = false,
  required = false
}: {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}) => {
  const { field, fieldState } = useFieldProps(name);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <FormItem>
      <FormLabel className="text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </FormLabel>
      <FormControl>
        <div className="relative w-full">
          <CustomInput
            {...field}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            disabled={disabled}
            className="pr-12"
          />
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors duration-200 disabled:opacity-50"
            onClick={togglePasswordVisibility}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </FormControl>
      <FormFieldMessage />
    </FormItem>
  );
};

export default PasswordInput;
