"use client";

// libs
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
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
import { useAnnounce } from "@/hooks";

const PasswordInput = ({
  name,
  label,
  placeholder,
  autoComplete,
  disabled = false,
  required = false
}: {
  name: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const tAnnounce = useTranslations("common.announce");
  const { announce } = useAnnounce();

  const handleTogglePasswordVisibility = () => {
    const willShow = !showPassword;
    announce(tAnnounce(willShow ? "passwordShown" : "passwordHidden"));
    setShowPassword(willShow);
  };

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
                autoComplete={autoComplete}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                disabled={disabled}
                className="pr-12"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50 hover:opacity-50 disabled:opacity-30"
                onClick={handleTogglePasswordVisibility}
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
