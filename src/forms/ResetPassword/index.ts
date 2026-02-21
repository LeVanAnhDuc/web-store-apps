// libs
import { zodResolver } from "@hookform/resolvers/zod";
// types
import type { UseFormProps } from "react-hook-form";
import type { ResetPasswordFormValues } from "@/types/ResetPassword";
// forms
import { initialResetPasswordFormData } from "./data";
import { resetPasswordValidation } from "./validations";

export const resetPasswordFormProps: UseFormProps<ResetPasswordFormValues> = {
  defaultValues: initialResetPasswordFormData,
  resolver: zodResolver(resetPasswordValidation)
};
