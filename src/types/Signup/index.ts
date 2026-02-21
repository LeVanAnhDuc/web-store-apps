// types
import type { z } from "zod";
import type {
  signupEmailFormValidation,
  signupInfoFormValidation
} from "@/forms/Signup/validations";

export type SignupEmailFormValues = z.infer<typeof signupEmailFormValidation>;

export type SignupInfoFormValues = z.infer<typeof signupInfoFormValidation>;
