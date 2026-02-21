// types
import type { z } from "zod";
import type {
  emailStepValidation,
  passwordStepValidation
} from "@/forms/Login/validations";

export type EmailStepFormValues = z.infer<typeof emailStepValidation>;
export type PasswordStepFormValues = z.infer<typeof passwordStepValidation>;
export type LoginFormValues = EmailStepFormValues & PasswordStepFormValues;
