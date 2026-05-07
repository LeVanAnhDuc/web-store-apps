// libs
import * as z from "zod";
// schemas
import { passwordSchema } from "@/schemas";

export const changePasswordValidation = z
  .object({
    currentPassword: z.string().min(1, { message: "required" }),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, { message: "required" })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "mismatch",
    path: ["confirmPassword"]
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordValidation>;
