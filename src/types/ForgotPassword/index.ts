// types
import type { z } from "zod";
import type { newPasswordValidation } from "@/forms/ForgotPassword/validations";

export type NewPasswordFormValues = z.infer<typeof newPasswordValidation>;
