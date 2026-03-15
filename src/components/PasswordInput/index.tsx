"use client";

// libs
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// components
import CustomInput from "@/components/CustomInput";
import FormFieldMessage from "@/components/FormFieldMessage";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";

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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <FormField
      name={name}
      render={({ field, fieldState }) => (
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
                className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50 hover:opacity-50 disabled:opacity-30"
                onClick={togglePasswordVisibility}
                onMouseDown={(e) => e.preventDefault()}
                disabled={disabled}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </FormControl>
          <FormFieldMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
